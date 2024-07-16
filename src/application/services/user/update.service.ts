import { IService } from "@/domain/shared/service.interface";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "@/domain/user/entity/user.entity";
import { Update } from "@/domain/user/use-cases/update.usecase";
import { FindUnique } from "@/domain/user/use-cases/find-unique.usecase";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { removePassword } from "@/application/utils/remove-password";
import { ConflictException } from "@/common/exceptions/conflict.exception";

export class UpdateService implements IService<UpdateUserDto, User> {
    constructor(
        private readonly update: Update,
        private readonly findUnique: FindUnique
    ) { }

    async execute(dto: UpdateUserDto): Promise<User> {
        const existingUser = await this.findUnique.execute({
            id: dto.id
        });

        if (!existingUser)
            throw new NotFoundException('Usuário não cadastrado');

        if (dto.email) {
            const userWithSameEmail = await this.findUnique.execute({ email: dto.email });

            if (userWithSameEmail?.different(existingUser))
                throw new ConflictException('E-mail já cadastrado');
        }

        const user = new User({
            ...dto,
            email: dto.email ?? existingUser.email.complete
        });
        await this.update.execute(user);

        return removePassword(Object.assign(existingUser, user));
    }

}