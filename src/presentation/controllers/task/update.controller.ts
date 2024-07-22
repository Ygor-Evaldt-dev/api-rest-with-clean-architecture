import { UpdateService } from "@/application/services/task";
import { NotFoundException } from "@/common/exceptions";
import { HttpStatus } from "@/common/utils/http-status";
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
            } catch (error: NotFoundException | any) {
                if (error instanceof NotFoundException)
                    res.send(HttpStatus.NOT_FOUND).send(error.message);
                else {
                    console.error("Error", error);
                    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                }

            }
        });
    }
}