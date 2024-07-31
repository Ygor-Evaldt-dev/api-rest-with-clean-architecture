import { HttpStatus } from "@/common/utils/http-status";
import { UpdateTaskDto } from "@/domain/task/dtos";
import { TaskUpdate } from "@/domain/task/use-cases";
import { handleRequestError } from "@/presentation/util";
import { Express, Request, Response } from "express";

export class TaskUpdateController {
    constructor(
        private readonly server: Express,
        private readonly update: TaskUpdate,
        private readonly middlewares: any[]
    ) {
        this.server.patch("/task/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const dto: UpdateTaskDto = {
                    id: req.params.id,
                    ...req.body
                };
                const response = await this.update.execute(dto);
                res.status(HttpStatus.OK).json(response);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}