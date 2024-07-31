import { NotFoundException } from "@/common/exceptions";
import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { IUseCase } from "@/domain/shared/usecase.interface";

export class UserRemove implements IUseCase<string, void> {
    constructor(private readonly reporisoty: IUserRepository) { }

    async execute(id: string): Promise<void> {
        const user = await this.reporisoty.findUnique({ id });
        if (user === null)
            throw new NotFoundException("Usuário não cadastrado");

        await this.reporisoty.delete(id);
    }
}
