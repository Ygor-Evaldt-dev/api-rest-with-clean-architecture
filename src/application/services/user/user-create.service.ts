import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user/entity/user.entity";
import { CreateUserDto } from "@/application/services/user/dtos";
import { ConflictException } from "@/common/exceptions";
import { removePassword } from "@/application/utils/remove-password";
import { UserCreate, UserFindUnique } from "@/domain/user/use-cases";

export class UserCreateService implements IService<CreateUserDto, User> {
    constructor(
        private readonly create: UserCreate,
        private readonly findUnique: UserFindUnique
    ) { }

    async execute(dto: CreateUserDto): Promise<User> {
        const alreadyRegistred = await this.findUnique.execute({
            email: dto.email
        });
        if (alreadyRegistred)
            throw new ConflictException("Usuário já cadastrado");

        const user = new User(dto);
        await this.create.execute(user);

        const userWithOutPassword = removePassword(user);
        return userWithOutPassword;
    }
}
