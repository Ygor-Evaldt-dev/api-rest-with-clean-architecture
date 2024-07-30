import { UpdateService } from "@/application/services/task";
import { HttpStatus } from "@/common/utils/http-status";
import { handleRequestError } from "@/presentation/util";
import { Express, Request, Response } from "express";

export class UpdateController {
    constructor(
        private readonly server: Express,
        private readonly update: UpdateService,
        private readonly middlewares: any[]
    ) {
        this.server.patch("/task/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const dto = {
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