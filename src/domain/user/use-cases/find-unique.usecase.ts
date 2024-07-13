import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user/user.entity";

export class FindUnique implements IService<string, User | null> {
    constructor(
        private readonly repository: IUserRepository
    ) { }

    async execute(email: string): Promise<User | null> {
        return await this.repository.findUnique(email);
    }
}