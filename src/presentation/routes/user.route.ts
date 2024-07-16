import { Express } from 'express';

import { BcryptAdapter } from '@/infra/adapters/bcrypt.adapter';
import { PrismaRepository } from '@/infra/repositories/user/prisma.repository';
import { UserModule } from '@/domain/user/user.module';
import { CreateService } from '@/application/services/user/create.service';
import { UpdateService } from '@/application/services/user/update.service';
import { CreateController } from '@/presentation/controllers/user/create.controller';
import { UpdateController } from '@/presentation/controllers/user/update.controller';
import { authMiddleware } from '@/presentation/middlewars/auth.middleware';
import { ITokenProvider } from '@/domain/ports/token-provider.interface';

export class UserRoute {
    constructor(
        private readonly server: Express,
        private readonly tokenProvider: ITokenProvider
    ) {
        const repository = new PrismaRepository();
        const encrypter = new BcryptAdapter();
        const userModule = new UserModule(repository, encrypter);

        const { create, findUnique, update, remove } = userModule.usecase;
        const auth = authMiddleware(findUnique, this.tokenProvider)

        const createService = new CreateService(create, findUnique);
        const updateService = new UpdateService(update, findUnique);

        new CreateController(this.server, createService);
        new UpdateController(this.server, updateService, [auth]);
    }
}