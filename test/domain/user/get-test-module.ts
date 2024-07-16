import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { UserModule } from "@/application/services/user/user.module";
import { BcryptAdapter } from "@/infra/adapters/bcrypt.adapter";
import { UserPrismaRepository } from "@/infra/repositories/user/user-prisma.repository";

export function getTestModule() {
	const repository: IUserRepository = new UserPrismaRepository();
	const encrypter: IEncrypter = new BcryptAdapter();
	const module = new UserModule(repository, encrypter);

	return module;
}
