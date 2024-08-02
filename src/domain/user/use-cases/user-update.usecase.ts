import { IEncrypter } from "@/domain/ports/encrypter.interface";
import { IUserRepository } from "@/domain/ports/user-repository.interface";
import { IUseCase } from "@/domain/shared/usecase.interface";
import { User } from "@/domain/user/entity/user.entity";
import { UpdateUserDto } from "../dtos";
import { NotFoundException } from "@/common/exceptions";

export class UserUpdate implements IUseCase<UpdateUserDto, void> {
    constructor(
        private readonly repository: IUserRepository,
        private readonly encrypter: IEncrypter
    ) { }

    async execute({
        id,
        email,
        password,
        name
    }: UpdateUserDto): Promise<void> {
        const existingUser = await this.repository.findUnique({ id });
        if (!existingUser)
            throw new NotFoundException("Usuário não cadastrado");

        const user = new User({
            id: existingUser.id.value,
            email: email ?? existingUser.email.complete,
            name,
            password
        });

        const encryptPassword = password
            ? await this.encrypter.encrypt(password)
            : existingUser.password?.value

        const encriptedUser = Object.assign(user, {
            password: {
                value: encryptPassword
            }
        });

        await this.repository.update(encriptedUser);
    }
}
