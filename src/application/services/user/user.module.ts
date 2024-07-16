import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { Create } from "@/domain/user/use-cases/create.usecase";
import { FindUnique } from "@/domain/user/use-cases/find-unique.usecase";
import { Remove } from "@/domain/user/use-cases/remove.usecase";
import { Update } from "@/domain/user/use-cases/update.usecase";
import { CreateService } from "./create.service";
import { FindService } from "./find.service";
import { UpdateService } from "./update.service";
import { DeleteService } from "./delete.service";

export class UserModule {
	readonly createService: CreateService;
	readonly findService: FindService;
	readonly updateService: UpdateService;
	readonly removeService: DeleteService;

	constructor(
		private readonly repository: IUserRepository,
		private readonly encrypter: IEncrypter
	) {
		const create = new Create(this.repository, this.encrypter);
		const findUnique = new FindUnique(this.repository);
		const update = new Update(this.repository, this.encrypter);
		const remove = new Remove(this.repository);

		this.createService = new CreateService(create, findUnique);
		this.findService = new FindService(findUnique);
		this.updateService = new UpdateService(update, findUnique);
		this.removeService = new DeleteService(findUnique, remove);
	}
}
