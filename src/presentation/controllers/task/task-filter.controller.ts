import { Express, Request, Response } from "express";
import { HttpStatus } from "@/common/utils/http-status";
import { handleRequestError } from "@/presentation/util";
import { TaskFilter } from "@/domain/task/use-cases";

export class TaskFilterController {
    constructor(
        private readonly server: Express,
        private readonly filter: TaskFilter,
        private readonly middlewares: any[]
    ) {
        this.server.get("/task/filter/:page/:take", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const { page, take } = req.params;
                const response = await this.filter.execute({
                    page: +page,
                    take: +take,
                    ...req.query,
                    userId: (req as any).user.id.value
                });
                res.status(HttpStatus.OK).json(response);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}