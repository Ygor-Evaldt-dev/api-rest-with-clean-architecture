import { IUseCase } from "@/domain/shared/usecase.interface";
import { User } from "../user.entity";

export class Create implements IUseCase<User, void> {
    constructor(
        private readonly repository: any
    ) { }

    async execute(user: User): Promise<void> {
        await this.repository.create(user);
    }

}