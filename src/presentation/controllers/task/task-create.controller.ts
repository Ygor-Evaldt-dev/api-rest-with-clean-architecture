import { Express, Request, Response } from "express";
import { HttpStatus } from "@/common/utils/http-status";
import { handleRequestError } from "@/presentation/util";
import { TaskCreate } from "@/domain/task/use-cases";

export class TaskCreateController {
    constructor(
        private readonly server: Express,
        private readonly create: TaskCreate,
        private readonly middlewares: any[]
    ) {
        this.server.post("/task", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const dto = {
                    ...req.body,
                    userId: (req as any).user.id.value
                };
                await this.create.execute(dto);

                res.sendStatus(HttpStatus.CREATED);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}