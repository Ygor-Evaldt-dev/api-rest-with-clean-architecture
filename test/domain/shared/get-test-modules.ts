import { AuthModule, TaskModule, UserModule } from "@/application/modules";
import { BcryptAdapter, JwtAdapter } from "@/infra/adapters";
import { TaskPrismaRepository } from "@/infra/repositories/task/task-prisma.repository";
import { UserPrismaRepository } from "@/infra/repositories/user/user-prisma.repository";
import { PrismaClient } from "@prisma/client";

import { config } from "dotenv";
config();

export function getTestModules() {
    const tokenProvider = new JwtAdapter(process.env.TOKEN_SECRET!);
    const encrypter = new BcryptAdapter();

    const prisma = new PrismaClient();
    const userRepository = new UserPrismaRepository(prisma);
    const taskRepository = new TaskPrismaRepository(prisma);

    const userModule = new UserModule(userRepository, encrypter);
    const authModule = new AuthModule(userRepository, encrypter, tokenProvider);
    const taskModule = new TaskModule(taskRepository);

    return ({
        userModule,
        authModule,
        taskModule
    });
}