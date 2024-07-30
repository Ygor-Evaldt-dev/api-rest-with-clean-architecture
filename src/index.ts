import { server } from "@/server";
import { UserPrismaRepository } from "@/infra/repositories/user/user-prisma.repository";
import { JwtAdapter } from "@/infra/adapters/jwt.adapter";
import { BcryptAdapter } from "@/infra/adapters/bcrypt.adapter";
import { UserRoutes } from "@/presentation/routes/user.routes";
import { AuthRoutes } from "@/presentation/routes/auth.routes";
import { authMiddleware } from "@/presentation/middlewars/auth.middleware";
import { UserModule } from "@/application/services/user/user.module";
import { AuthModule } from "@/application/services/auth/auth.module";
import { PrismaClient } from "@prisma/client";
import { TaskModule } from "./application/services/task";
import { TaskPrismaRepository } from "./infra/repositories/task/task-prisma.repository";
import { TaskRoutes } from "./presentation/routes/task.route";
import { UuidAdapter } from "./infra/adapters/uuid.adapter";
import { uuidMiddleware } from "./presentation/middlewars/uuid.middleware";

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
