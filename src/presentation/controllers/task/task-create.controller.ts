import { Express, Request, Response } from "express";
import { TaskCreateService } from "@/application/services/task";
import { HttpStatus } from "@/common/utils/http-status";
import { handleRequestError } from "@/presentation/util";

export class TaskCreateController {
    constructor(
        private readonly server: Express,
        private readonly create: TaskCreateService,
        private readonly middlewares: any[]
    ) {
        this.server.post("/task", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const dto = {
                    ...req.body,
                    userId: (req as any).user.id.value
                };
                const response = await this.create.execute(dto);
                res.status(HttpStatus.CREATED).json(response);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}