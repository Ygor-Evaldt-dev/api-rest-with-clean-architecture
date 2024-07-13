import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { UserModule } from "@/domain/user/user.module";
import { BcryptAdapter } from "@/infra/adapters/bcrypt.adapter";
import { PrismaRepository } from "@/infra/repositories/user/prisma.repository";

export function getTestModule() {
    const repository: IUserRepository = new PrismaRepository();
    const encrypter: IEncrypter = new BcryptAdapter();
    const module = new UserModule(repository, encrypter);

    return module;
}