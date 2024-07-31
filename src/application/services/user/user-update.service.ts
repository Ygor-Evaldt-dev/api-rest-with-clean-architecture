import { IService } from "@/domain/shared/service.interface";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "@/domain/user/entity/user.entity";
import { UserUpdate } from "@/domain/user/use-cases/user-update.usecase";
import { UserFindUnique } from "@/domain/user/use-cases/user-find-unique.usecase";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { removePassword } from "@/application/utils/remove-password";
import { ConflictException } from "@/common/exceptions/conflict.exception";

export class UserUpdateService implements IService<UpdateUserDto, User> {
    constructor(
        private readonly update: UserUpdate,
        private readonly findUnique: UserFindUnique
    ) { }

    async execute(dto: UpdateUserDto): Promise<User> {
        const existingUser = await this.findUnique.execute({
            id: dto.id
        });

        if (!existingUser)
            throw new NotFoundException("Usuário não cadastrado");

        if (dto.email) {
            const userWithSameEmail = await this.findUnique.execute({
                email: dto.email
            });

            if (userWithSameEmail?.different(existingUser))
                throw new ConflictException("E-mail já cadastrado");
        }

        const user = new User({
            ...dto,
            email: dto.email ?? existingUser.email.complete
        });
        await this.update.execute(user);

        return removePassword(Object.assign(existingUser, user));
    }
}
