import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user/entity/user.entity";
import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { IEncrypter } from "@/domain/ports/encrypter.interface";

export class Create implements IService<User, void> {
    constructor(
        private readonly repository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) { }

    async execute(user: User): Promise<void> {
        const encryptedPassword = await this.encrypter.encrypt(user.password!);
        const userWithEncryptedPassword = Object.assign(user, {
            password: encryptedPassword
        });

        await this.repository.create(userWithEncryptedPassword);
    }

}