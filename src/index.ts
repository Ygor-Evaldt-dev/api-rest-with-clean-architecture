import { server } from "@/server";
import { UserPrismaRepository } from "@/infra/repositories/user/user-prisma.repository";
import { JwtAdapter } from "@/infra/adapters/jwt.adapter";
import { BcryptAdapter } from "@/infra/adapters/bcrypt.adapter";
import { UserRoutes } from "@/presentation/routes/user.routes";
import { AuthRoutes } from "@/presentation/routes/auth.routes";
import { authMiddleware } from "@/presentation/middlewars/auth.middleware";
import { UserModule } from "@/application/services/user/user.module";
import { AuthModule } from "@/application/services/auth/auth.module";

const tokenProvider = new JwtAdapter(process.env.TOKEN_SECRET!);
const encrypter = new BcryptAdapter();

const userRepository = new UserPrismaRepository();

const userModule = new UserModule(userRepository, encrypter);
const authModule = new AuthModule(userRepository, encrypter, tokenProvider);

const authentication = authMiddleware(userModule.findService, tokenProvider);

new AuthRoutes(server, authModule);
new UserRoutes(server, userModule, [authentication]);
