import { IUseCase } from "@/domain/shared/usecase.interface";
import { User } from "@/domain/user/entity/user.entity";
import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { CreateUserDto } from "../dtos";
import { ConflictException } from "@/common/exceptions";

export class UserCreate implements IUseCase<CreateUserDto, void> {
    constructor(
        private readonly repository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) { }

    async execute(dto: CreateUserDto): Promise<void> {
        const existingUser = await this.repository.findUnique({ email: dto.email });
        if (existingUser)
            throw new ConflictException("Usuário já cadastrado");

        const user = new User(dto);

        const encryptedPassword = await this.encrypter.encrypt(user.password?.value!);
        const userWithEncryptedPassword = Object.assign(user, {
            password: {
                value: encryptedPassword
            }
        });

        await this.repository.create(userWithEncryptedPassword);
    }
}
