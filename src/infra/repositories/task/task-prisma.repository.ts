import { ITaskRepository } from "@/domain/ports/task-repository.interface";
import { Task } from "@/domain/task/entity/task.entity";
import { TaskDto } from "./task.dto";
import { StatusEnum } from "@/domain/shared/enums/status.enum";
import { PrismaClient } from "@prisma/client";
import { PaginationInput } from "@/domain/shared/types";
import { TaskFilterParam } from "@/domain/task/types/task-filter-param";
import { Status } from "@/domain/shared/value-objects";

export class TaskPrismaRepository implements ITaskRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) { }

    async create(userId: string, task: Task): Promise<void> {
        const data = this.toDatabase(task);
        await this.prisma.task.create({
            data: {
                ...data,
                userId
            }
        });
    }

    async findUnique(id: string): Promise<Task | null> {
        const task = await this.prisma.task.findUnique({
            where: { id }
        });
        if (!task) return null;

        return this.fromDatabase({
            ...task,
            description: task.description ?? undefined
        });
    }

    async findMany({
        page,
        take
    }: PaginationInput): Promise<Task[]> {
        const registers = await this.prisma.task.findMany({
            skip: (page * take),
            take
        });

        return registers.map(register => this.fromDatabase({
            ...register,
            description: register.description ?? undefined
        }));
    }

    async filter({
        page,
        take,
        title,
        status
    }: TaskFilterParam): Promise<Task[]> {
        const registers = await this.prisma.task.findMany({
            skip: (page * take),
            take,
            where: {
                title: title ? { startsWith: `%${title.trim().toLowerCase()}` } : undefined,
                status
            }
        });

        return registers.map(register => this.fromDatabase({
            ...register,
            description: register.description ?? undefined
        }));
    }

    async update(task: Task): Promise<void> {
        await this.prisma.task.update({
            where: {
                id: task.id.value
            },
            data: this.toDatabase(task)
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.task.delete({
            where: { id }
        });
    }

    async total(params?: TaskFilterParam): Promise<number> {
        if (params) {
            const { title, status } = params;

            return await this.prisma.task.count({
                where: {
                    title: title ? { startsWith: `%${title}` } : undefined,
                    status
                }
            });
        }

        return await this.prisma.task.count();
    }

    private toDatabase({
        id,
        title,
        description,
        status
    }: Task) {
        return ({
            id: id.value,
            title: title.complete.toLowerCase(),
            description: description?.complete,
            status: status?.value
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
            status: status as StatusEnum
        });
    }
}