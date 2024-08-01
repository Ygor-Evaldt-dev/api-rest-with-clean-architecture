import { Express, Request, Response } from "express";
import { HttpStatus } from "@/common/utils/http-status";
import { handleRequestError } from "@/presentation/util";
import { TaskRemove } from "@/domain/task/use-cases";

export class TaskRemoveController {
    constructor(
        private readonly server: Express,
        private readonly remove: TaskRemove,
        private readonly middlewares: any[]
    ) {
        this.server.delete("/task/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                await this.remove.execute(req.params.id);
                res.sendStatus(HttpStatus.OK);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}