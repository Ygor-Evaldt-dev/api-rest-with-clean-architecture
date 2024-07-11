import { IUserRepository } from '@/domain/shared/ports/user-repository.interface';
import { Usecase } from './types/usecase';
import { Create } from './use-cases/create.usecase';
import { FindUnique } from './use-cases/find-unique.usecase';

export class UserModule {
    private readonly repository: IUserRepository;
    readonly usecase: Usecase;

    constructor(
        repository: IUserRepository
    ) {
        this.repository = repository;

        this.usecase = {
            create: new Create(this.repository),
            findUnique: new FindUnique(this.repository)
        }
    }
}