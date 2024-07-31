import { PrismaClient } from "@prisma/client";
import { TaskPrismaRepository } from "@/infra/repositories/task/task-prisma.repository";
import { TaskCreateUseCase, TaskFindManyUseCase, TaskUpdateUseCase, TaskRemoveUseCase } from "@/domain/task/use-cases";

export function getTestModule() {
    const prisma = new PrismaClient();
    const taskRepository = new TaskPrismaRepository(prisma);
    const createUseCase = new TaskCreateUseCase(taskRepository);
    const findManyUseCase = new TaskFindManyUseCase(taskRepository);
    const updateUseCase = new TaskUpdateUseCase(taskRepository);
    const removeUseCase = new TaskRemoveUseCase(taskRepository);

    return ({
        taskRepository,
        createUseCase,
        findManyUseCase,
        updateUseCase,
        removeUseCase
    });
}