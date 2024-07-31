import { Express, Request, Response } from "express";
import { HttpStatus } from "@/common/utils/http-status";
import { handleRequestError, validateDto } from "@/presentation/util";
import { UserCreate } from "@/domain/user/use-cases";

export class UserCreateController {
    constructor(
        private readonly server: Express,
        private readonly create: UserCreate
    ) {
        this.server.post("/user", async (req: Request, res: Response) => {
            try {
                await this.create.execute(req.body);
                res.sendStatus(HttpStatus.CREATED);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}
