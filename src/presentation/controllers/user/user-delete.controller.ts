import { Request, Response, Express } from "express";
import { HttpStatus } from "@/common/utils/http-status";
import { UserDeleteService } from "@/application/services/user/user-delete.service";
import { handleRequestError } from "@/presentation/util";

export class UserDeleteController {
    constructor(
        private readonly server: Express,
        private readonly remove: UserDeleteService,
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
