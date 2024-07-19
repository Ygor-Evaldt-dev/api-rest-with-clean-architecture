import { CreateUseCase } from "@/domain/task/use-cases/create.usecase";
import { TaskPrismaRepository } from "@/infra/repositories/task/task-prisma.repository";
import { PrismaClient } from "@prisma/client";

export function getTestingModule() {
    const prisma = new PrismaClient();
    const taskRepository = new TaskPrismaRepository(prisma);
    const createUseCase = new CreateUseCase(taskRepository);

    return ({
        taskRepository,
        createUseCase
    });
}