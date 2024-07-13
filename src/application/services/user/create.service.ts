import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user/entity/user.entity";
import { Create } from "@/domain/user/use-cases/create.usecase";
import { CreateUserDto } from "@/application/services/user/dtos/create-user.dto";

export class CreateService implements IService<CreateUserDto, User> {
    constructor(
        private readonly usecase: Create
    ) { }

    async execute(dto: CreateUserDto): Promise<User> {
        const user = new User(dto);
        await this.usecase.execute(user);

        return Object.assign(user, {
            password: undefined
        });
    }
}