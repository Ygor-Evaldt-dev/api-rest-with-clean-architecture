import { IUserRepository, IEncrypter } from "@/domain/ports";
import { CreateService, FindService, UpdateService, DeleteService } from "@/application/services/user"
import { Create, FindUnique, Update, Remove } from "@/domain/user/use-cases";

export class UserModule {
    readonly createService: CreateService;
    readonly findService: FindService;
    readonly updateService: UpdateService;
    readonly deleteService: DeleteService;

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
        this.deleteService = new DeleteService(findUnique, remove);
    }
}
