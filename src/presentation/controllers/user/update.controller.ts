import { Request, Response, Express } from "express";

import { HttpStatus } from "@/common/utils/http-status";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { ConflictException } from "@/common/exceptions/conflict.exception";
import { UpdateService } from "@/application/services/user/update.service";

export class UpdateController {
    constructor(
        private readonly server: Express,
        private readonly update: UpdateService,
        private middlewares: any[]
    ) {
        this.server.patch("/user/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const dto = { ...req.body, id: req.params.id };
                const response = await this.update.execute(dto);
                res.status(HttpStatus.OK).json(response);
            } catch (error: NotFoundException | ConflictException | any) {
                if (error instanceof NotFoundException)
                    res.status(HttpStatus.NOT_FOUND).send(error.message);
                else if (error instanceof ConflictException)
                    res.status(HttpStatus.CONFLICT).send(error.message);
                else
                    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
