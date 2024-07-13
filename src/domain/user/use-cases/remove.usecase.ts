import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { IService } from "@/domain/shared/service.interface";

export class Delete implements IService<string, void> {
    constructor(
        private readonly reporisoty: IUserRepository
    ) { }

    async execute(id: string): Promise<void> {
        await this.reporisoty.delete(id);
    }
}