import { NotFoundException } from "@/common/exceptions";
import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { IUseCase } from "@/domain/shared/usecase.interface";
import { User } from "@/domain/user/entity/user.entity";
import { removePassword } from "@/domain/shared/utils";

type Params = {
    id?: string;
    email?: string;
};

export class UserFindUnique implements IUseCase<Params, User> {
    constructor(
        private readonly repository: IUserRepository
    ) { }

    async execute({ id, email }: Params): Promise<User> {
        const user = await this.repository.findUnique({ id, email });
        if (!user)
            throw new NotFoundException("Usuário não cadastrado");

        return removePassword(user);
    }
}
