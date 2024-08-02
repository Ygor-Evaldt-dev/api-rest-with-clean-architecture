import { User } from "@/domain/user/entity/user.entity";
import { getTestModules, userDto } from "./";

export async function getExistingUser(): Promise<User> {
    const { userModule } = getTestModules();
    await userModule.create.execute(userDto);

    return await userModule.find.execute({
        email: userDto.email
    });
}