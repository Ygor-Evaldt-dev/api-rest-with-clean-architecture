import { IService } from "@/domain/shared/service.interface";
import { FindUnique } from "@/domain/user/use-cases/find-unique.usecase";
import { User } from "@/domain/user/entity/user.entity";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { removePassword } from "@/application/utils/remove-password";

export class FindService implements IService<string, User> {
    constructor(
        private readonly usecase: FindUnique
    ) { }

    async execute(id: string): Promise<User> {
        const user = await this.usecase.execute({ id });
        if (user === null)
            throw new NotFoundException('Usuario não cadastrado');

        return removePassword(user);
    }
}