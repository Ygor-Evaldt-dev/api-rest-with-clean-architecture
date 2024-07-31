import { IService } from "@/domain/shared/service.interface";
import { UserFindUnique, UserRemove } from "@/domain/user/use-cases";
import { NotFoundException } from "@/common/exceptions/not-found.exception";

export class UserDeleteService implements IService<string, void> {
    constructor(
        private readonly findUnique: UserFindUnique,
        private readonly remove: UserRemove
    ) { }

    async execute(id: string): Promise<void> {
        const existingUser = await this.findUnique.execute({ id });
        if (!existingUser)
            throw new NotFoundException("Usuário não cadastrado");

        await this.remove.execute(id);
    }
}
