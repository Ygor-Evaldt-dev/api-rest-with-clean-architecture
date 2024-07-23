import { RemoveService } from "@/application/services/task";
import { NotFoundException } from "@/common/exceptions";
import { HttpStatus } from "@/common/utils/http-status";
import { Express, Request, Response } from "express";

export class RemoveController {
    constructor(
        private readonly server: Express,
        private readonly remove: RemoveService,
        private readonly middlewares: any[]
    ) {
        this.server.delete("/task/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                await this.remove.execute(req.params.id);
                res.sendStatus(HttpStatus.OK);
            } catch (error: NotFoundException | any) {
                if (error instanceof NotFoundException)
                    res.status(HttpStatus.NOT_FOUND).send(error.message);
                else {
                    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
                    console.error(error.message);
                }
            }
        });
    }
}