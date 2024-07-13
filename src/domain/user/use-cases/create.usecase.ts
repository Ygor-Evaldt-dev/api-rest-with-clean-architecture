import { IService } from "@/domain/shared/service.interface";
import { User } from "../user.entity";
import { IUserRepository } from "@/domain/shared/ports/user-repository.interface";
import { IEncrypter } from "@/domain/shared/ports/encrypter.interface";

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