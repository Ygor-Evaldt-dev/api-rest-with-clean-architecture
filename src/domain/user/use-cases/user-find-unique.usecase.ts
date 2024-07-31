import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user/entity/user.entity";

type Params = {
    id?: string;
    email?: string;
};

export class UserFindUnique implements IService<Params, User | null> {
    constructor(
        private readonly repository: IUserRepository
    ) { }

    async execute({ id, email }: Params): Promise<User | null> {
        return await this.repository.findUnique({ id, email });
    }
}
