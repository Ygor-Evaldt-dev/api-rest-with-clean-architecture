import { IService } from "@/domain/shared/service.interface";
import { FindUnique } from "@/domain/user/use-cases/find-unique.usecase";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { Remove } from "@/domain/user/use-cases/remove.usecase";

export class DeleteService implements IService<string, void> {
    constructor(
        private readonly findUnique: FindUnique,
        private readonly remove: Remove
    ) { }

    async execute(id: string): Promise<void> {
        const existingUser = await this.findUnique.execute({ id });
        if (!existingUser)
            throw new NotFoundException("Usuário não cadastrado");

        await this.remove.execute(id);
    }
}
