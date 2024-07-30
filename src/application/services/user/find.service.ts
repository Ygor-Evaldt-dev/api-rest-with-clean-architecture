import { IService } from "@/domain/shared/service.interface";
import { FindUnique } from "@/domain/user/use-cases/find-unique.usecase";
import { User } from "@/domain/user/entity/user.entity";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { removePassword } from "@/application/utils/remove-password";
import { validateUuid } from "@/application/utils";

type Params = {
    id?: string;
    email?: string;
};

export class FindService implements IService<Params, User> {
    constructor(
        private readonly usecase: FindUnique,
    ) { }

    async execute({ id, email }: Params): Promise<User> {
        if (id) validateUuid(id, "usuário");

        const user = await this.usecase.execute({ id, email });
        if (user === null)
            throw new NotFoundException("Usuário não cadastrado");

        return removePassword(user);
    }
}
