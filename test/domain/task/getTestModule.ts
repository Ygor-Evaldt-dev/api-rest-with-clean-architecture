import { PrismaClient } from "@prisma/client";
import { TaskPrismaRepository } from "@/infra/repositories/task/task-prisma.repository";
import { CreateUseCase, FindManyUseCase, UpdateUseCase, RemoveUseCase } from "@/domain/task/use-cases";

export function getTestModule() {
    const prisma = new PrismaClient();
    const taskRepository = new TaskPrismaRepository(prisma);
    const createUseCase = new CreateUseCase(taskRepository);
    const findManyUseCase = new FindManyUseCase(taskRepository);
    const updateUseCase = new UpdateUseCase(taskRepository);
    const removeUseCase = new RemoveUseCase(taskRepository);

    return ({
        taskRepository,
        createUseCase,
        findManyUseCase,
        updateUseCase,
        removeUseCase
    });
}