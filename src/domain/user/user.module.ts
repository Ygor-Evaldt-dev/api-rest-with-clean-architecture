import { IUserRepository } from '@/domain/ports/user-repository.interface';
import { Usecase } from '@/domain/user/types/usecase';
import { Create } from '@/domain/user/use-cases/create.usecase';
import { FindUnique } from '@/domain/user/use-cases/find-unique.usecase';
import { IEncrypter } from '@/domain/ports/encrypter.interface';
import { Remove } from '@/domain/user/use-cases/remove.usecase';
import { Update } from './use-cases/update.usecase';

export class UserModule {
    readonly usecase: Usecase;

    constructor(
        private readonly repository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) {
        this.usecase = {
            create: new Create(this.repository, this.encrypter),
            findUnique: new FindUnique(this.repository),
            remove: new Remove(this.repository),
            update: new Update(this.repository, this.encrypter)
        }
    }
}