import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user/entity/user.entity";
import { Create } from "@/domain/user/use-cases/create.usecase";
import { CreateUserDto } from "@/application/services/user/dtos/create-user.dto";
import { FindUnique } from "@/domain/user/use-cases/find-unique.usecase";
import { ConflictException } from "@/application/common/exceptions/conflict.exeption";

export class CreateService implements IService<CreateUserDto, User> {
    constructor(
        private readonly create: Create,
        private readonly findUnique: FindUnique
    ) { }

    async execute(dto: CreateUserDto): Promise<User> {
        const alreadyRegistred = await this.findUnique.execute(dto.email);
        if (alreadyRegistred) throw new ConflictException('E-mail já cadastrado');

        const user = new User(dto);
        await this.create.execute(user);

        return Object.assign(user, {
            password: undefined
        });
    }
}