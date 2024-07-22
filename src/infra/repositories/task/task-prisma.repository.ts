import { ITaskRepository } from "@/domain/ports/task-repository.interface";
import { Task } from "@/domain/task/entity/task.entity";
import { TaskDto } from "./task.dto";
import { Status } from "@/domain/shared/enums/status";
import { PrismaClient } from "@prisma/client";
import { PaginationInput } from "@/domain/shared/types";

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

    async findMany({
        page,
        take
    }: PaginationInput): Promise<Task[]> {
        const registers = await this.prisma.task.findMany({
            skip: page * take,
            take
        });

        return registers.map(register => this.fromDatabase({
            ...register,
            description: register.description || undefined
        }));
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

    async total(): Promise<number> {
        return await this.prisma.task.count();
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