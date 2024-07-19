import { ITaskRepository } from "@/domain/ports/task-repository.interface";
import { Task } from "@/domain/task/entity/task.entity";
import { TaskDto } from "./task.dto";
import { Status } from "@/domain/shared/enums/status";
import { PrismaClient } from "@prisma/client";

export class TaskPrismaRepository implements ITaskRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) { }

    async create(userId: string, task: Task): Promise<void> {
        await this.prisma.task.create({
            data: {
                id: task.id.value,
                title: task.title.complete,
                description: task.description?.complete,
                status: task.status,
                userId
            }
        });
    }

    async update(task: Task): Promise<void> {
        await this.prisma.task.update({
            where: {
                id: task.id.value
            },
            data: {
                title: task.title.complete,
                description: task.description?.complete,
                status: task.status,
            }
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.task.delete({
            where: { id }
        });
    }

    private fromDatabase({
        id,
        title,
        description,
        status
    }: TaskDto) {
        return new Task({
            id,
            title,
            description,
            status: status as Status
        });
    }
}