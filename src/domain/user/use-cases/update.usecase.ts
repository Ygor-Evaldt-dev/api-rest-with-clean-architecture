import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user//entity/user.entity";

type Params = {
    id: string,
    user: User
}

export class Update implements IService<Params, void> {
    constructor(
        private readonly repository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) { }

    async execute({
        id,
        user
    }: Params): Promise<void> {
        const existingUser = await this.repository.findUnique({ id });
        if (existingUser === null) return;

        const encryptedPassword = user.password
            ? await this.encrypter.encrypt(user.password!)
            : existingUser?.password


        Object.assign(existingUser, user, {
            password: encryptedPassword,
            id: existingUser.id
        });

        await this.repository.update(existingUser);
    }

}