import { HttpStatus } from "@/common/utils/http-status";
import { TaskFindUnique } from "@/domain/task/use-cases";
import { handleRequestError } from "@/presentation/util";
import { Express, Request, Response } from "express";

export class TaskFindUniqueController {
    constructor(
        private readonly server: Express,
        private readonly findUnique: TaskFindUnique,
        private readonly middlewares: any[]
    ) {
        this.server.get("/task/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const response = await this.findUnique.execute(req.params.id);
                res.status(HttpStatus.OK).json(response);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        })
    }
}