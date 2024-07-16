import { server } from '@/server';
import { UserRoutes } from '@/presentation/routes/user.routes';
import { JwtAdapter } from './infra/adapters/jwt.adapter';
import { AuthRoutes } from './presentation/routes/auth.routes';
import { UserPrismaRepository } from './infra/repositories/user/user-prisma.repository';
import { BcryptAdapter } from './infra/adapters/bcrypt.adapter';
import { UserModule } from './application/services/user/user.module';
import { authMiddleware } from './presentation/middlewars/auth.middleware';
import { AuthModule } from './application/services/auth/auth.module';

const tokenProvider = new JwtAdapter(process.env.TOKEN_SECRET!);
const encrypter = new BcryptAdapter();

const userRepository = new UserPrismaRepository();

const userModule = new UserModule(userRepository, encrypter);
const { findService } = userModule;

const authModule = new AuthModule(userRepository, encrypter, tokenProvider);

const authentication = authMiddleware(findService, tokenProvider);

new AuthRoutes(server, authModule);
new UserRoutes(server, userModule, [authentication]);