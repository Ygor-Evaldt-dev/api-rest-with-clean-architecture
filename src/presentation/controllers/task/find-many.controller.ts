import { Express, Request, Response } from "express";
import { FindManyService } from "@/application/services/task";
import { HttpStatus } from "@/common/utils/http-status";
import { handleRequestError } from "@/presentation/util";

export class FindManyController {
    constructor(
        private readonly server: Express,
        private readonly findMany: FindManyService,
        private readonly middlewares: any[]
    ) {
        this.server.get("/task/:page/:take", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const { page, take } = req.params
                const response = await this.findMany.execute({
                    page: +page,
                    take: +take
                });
                res.status(HttpStatus.OK).json(response);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}