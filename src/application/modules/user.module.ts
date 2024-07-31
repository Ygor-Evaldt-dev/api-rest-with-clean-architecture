import { IUserRepository, IEncrypter } from "@/domain/ports";
import { UserCreate, UserFindUnique, UserUpdate, UserRemove } from "@/domain/user/use-cases";

export class UserModule {
    readonly create: UserCreate;
    readonly find: UserFindUnique;
    readonly update: UserUpdate;
    readonly remove: UserRemove;

    constructor(
        private readonly repository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) {
        this.create = new UserCreate(this.repository, this.encrypter);
        this.find = new UserFindUnique(this.repository);
        this.update = new UserUpdate(this.repository, this.encrypter);
        this.remove = new UserRemove(this.repository);
    }
}
