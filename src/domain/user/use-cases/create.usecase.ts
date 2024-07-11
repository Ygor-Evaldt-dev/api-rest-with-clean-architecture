import { IService } from "@/domain/shared/service.interface";
import { User } from "../user.entity";
import { IUserRepository } from "@/domain/shared/ports/user-repository.interface";

export class Create implements IService<User, void> {
    constructor(
        private readonly repository: IUserRepository
    ) { }

    async execute(user: User): Promise<void> {
        await this.repository.create(user);
    }

}