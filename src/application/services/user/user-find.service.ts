import { IService } from "@/domain/shared/service.interface";
import { UserFindUnique } from "@/domain/user/use-cases/user-find-unique.usecase";
import { User } from "@/domain/user/entity/user.entity";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { removePassword } from "@/application/utils/remove-password";

type Params = {
    id?: string;
    email?: string;
};

export class UserFindService implements IService<Params, User> {
    constructor(
        private readonly usecase: UserFindUnique,
    ) { }

    async execute({ id, email }: Params): Promise<User> {
        const user = await this.usecase.execute({ id, email });
        if (user === null)
            throw new NotFoundException("Usuário não cadastrado");

        return removePassword(user);
    }
}
