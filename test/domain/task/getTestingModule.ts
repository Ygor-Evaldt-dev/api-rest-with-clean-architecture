import { CreateUseCase } from "@/domain/task/use-cases/create.usecase";
import { UpdateUseCase } from "@/domain/task/use-cases/update.usecase";
import { TaskPrismaRepository } from "@/infra/repositories/task/task-prisma.repository";
import { PrismaClient } from "@prisma/client";

export function getTestingModule() {
    const prisma = new PrismaClient();
    const taskRepository = new TaskPrismaRepository(prisma);
    const createUseCase = new CreateUseCase(taskRepository);
    const updateUseCase = new UpdateUseCase(taskRepository);

    return ({
        taskRepository,
        createUseCase,
        updateUseCase
    });
}