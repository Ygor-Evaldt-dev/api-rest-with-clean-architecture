import { CreateService } from '@/application/services/user/create.service';
import { UserModule } from '@/domain/user/user.module';
import { BcryptAdapter } from '@/infra/adapters/bcrypt.adapter';
import { PrismaRepository } from '@/infra/repositories/user/prisma.repository';
import { Express } from 'express';
import { CreateController } from '../controllers/user/create.controller';

export class UserRoute {
    constructor(
        private readonly server: Express
    ) {
        const repository = new PrismaRepository();
        const encrypter = new BcryptAdapter();
        const userModule = new UserModule(repository, encrypter);

        const { create, findUnique, update, remove } = userModule.usecase;

        const createService = new CreateService(create, findUnique);

        new CreateController(this.server, createService);
    }
}