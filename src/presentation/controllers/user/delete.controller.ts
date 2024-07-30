import { Request, Response, Express } from "express";

import { HttpStatus } from "@/common/utils/http-status";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { ConflictException } from "@/common/exceptions/conflict.exception";
import { DeleteService } from "@/application/services/user/delete.service";
import { handleRequestError } from "@/presentation/util";

export class DeleteController {
    constructor(
        private readonly server: Express,
        private readonly remove: DeleteService,
        private middlewares: any[]
    ) {
        this.server.delete("/user/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                await this.remove.execute(req.params.id);
                res.sendStatus(HttpStatus.OK);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}
