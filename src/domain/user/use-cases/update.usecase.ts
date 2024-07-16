import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user//entity/user.entity";

export class Update implements IService<User, void> {
    constructor(
        private readonly repository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) { }

    async execute(user: User): Promise<void> {
        // const existingUser = await this.repository.findUnique({
        //     id: user.id.value
        // });
        // if (existingUser === null) return;

        if (user.password) {
            const password = await this.encrypter.encrypt(user.password);
            Object.assign(user, { password })
        }


        // Object.assign(existingUser, user, {
        //     password: encryptedPassword,
        //     id: existingUser.id
        // });

        await this.repository.update(user);
    }

}