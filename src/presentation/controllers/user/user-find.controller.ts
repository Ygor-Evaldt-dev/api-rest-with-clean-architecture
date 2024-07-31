import { UserFindService } from "@/application/services/user/user-find.service";
import { HttpStatus } from "@/common/utils/http-status";
import { UserFindUnique } from "@/domain/user/use-cases";
import { handleRequestError } from "@/presentation/util";
import { Request, Response, Express } from "express";

export class UserFindController {
    constructor(
        private readonly server: Express,
        private readonly find: UserFindUnique,
        private readonly middlewares: any[]
    ) {
        this.server.get("/user/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const response = await this.find.execute({
                    id: req.params?.id
                });

                res.status(HttpStatus.OK).json(response);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}
