import { IEncrypter } from "../../../src/domain/ports/encrypter.interface";
import { IUserRepository } from "../../../src/domain/ports/user-repository.interface";
import { UserModule } from "../../../src/domain/user/user.module";
import { BcryptAdapter } from "../../../src/infra/adapters/bcrypt.adapter";
import { PrismaRepository } from "../../../src/infra/repositories/user/prisma.repository";

export function getTestModule() {
    const repository: IUserRepository = new PrismaRepository();
    const encrypter: IEncrypter = new BcryptAdapter();
    const module = new UserModule(repository, encrypter);

    return module;
}