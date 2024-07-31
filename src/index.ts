import { server } from "@/server";
import { PrismaClient } from "@prisma/client";
import { UserPrismaRepository } from "@/infra/repositories/user/user-prisma.repository";
import { TaskPrismaRepository } from "@/infra/repositories/task/task-prisma.repository";
import { JwtAdapter, BcryptAdapter } from "@/infra/adapters";
import { UserRoutes, AuthRoutes, TaskRoutes } from "@/presentation/routes";
import { authMiddleware, uuidMiddleware } from "@/presentation/middlewars";
import { UserModule } from "@/application/services/user/user.module";
import { AuthModule } from "@/application/services/auth/auth.module";
import { TaskModule } from "@/application/services/task";

const tokenProvider = new JwtAdapter(process.env.TOKEN_SECRET!);
const encrypter = new BcryptAdapter();

const prisma = new PrismaClient();
const userRepository = new UserPrismaRepository(prisma);
const taskRepository = new TaskPrismaRepository(prisma);

const userModule = new UserModule(userRepository, encrypter);
const authModule = new AuthModule(userRepository, encrypter, tokenProvider);
const taskModule = new TaskModule(taskRepository);

const authentication = authMiddleware(userModule.findService, tokenProvider);
const uuid = uuidMiddleware();

new AuthRoutes(server, authModule);
new UserRoutes(server, userModule, [authentication, uuid]);
new TaskRoutes(server, taskModule, [authentication, uuid]);
