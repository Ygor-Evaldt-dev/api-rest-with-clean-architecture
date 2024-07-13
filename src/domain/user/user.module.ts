import { IUserRepository } from '@/domain/ports/user-repository.interface';
import { Usecase } from './types/usecase';
import { Create } from './use-cases/create.usecase';
import { FindUnique } from './use-cases/find-unique.usecase';
import { IEncrypter } from '../ports/encrypter.interface';

export class UserModule {
    readonly usecase: Usecase;

    constructor(
        private readonly repository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) {
        this.usecase = {
            create: new Create(this.repository, this.encrypter),
            findUnique: new FindUnique(this.repository)
        }
    }
}