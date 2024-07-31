import { Request, Response, Express } from "express";
import { HttpStatus } from "@/common/utils/http-status";
import { handleRequestError } from "@/presentation/util";
import { UserRemove } from "@/domain/user/use-cases";

export class UserDeleteController {
    constructor(
        private readonly server: Express,
        private readonly remove: UserRemove,
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
