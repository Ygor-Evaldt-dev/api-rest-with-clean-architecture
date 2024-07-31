import { IUserRepository, IEncrypter } from "@/domain/ports";
import { UserCreateService, UserFindService, UserUpdateService, UserDeleteService } from "@/application/services/user"
import { UserCreate, UserFindUnique, UserUpdate, UserRemove } from "@/domain/user/use-cases";

export class UserModule {
    readonly createService: UserCreateService;
    readonly findService: UserFindService;
    readonly updateService: UserUpdateService;
    readonly deleteService: UserDeleteService;

    constructor(
        private readonly repository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) {
        const create = new UserCreate(this.repository, this.encrypter);
        const findUnique = new UserFindUnique(this.repository);
        const update = new UserUpdate(this.repository, this.encrypter);
        const remove = new UserRemove(this.repository);

        this.createService = new UserCreateService(create, findUnique);
        this.findService = new UserFindService(findUnique);
        this.updateService = new UserUpdateService(update, findUnique);
        this.deleteService = new UserDeleteService(findUnique, remove);
    }
}
