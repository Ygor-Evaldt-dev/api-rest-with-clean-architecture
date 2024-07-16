import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { HttpStatus } from "@/common/utils/http-status";
import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user/entity/user.entity";
import { Request, Response, Express } from "express";

export class FindController {
    constructor(
        private readonly server: Express,
        private readonly find: IService<string, User>,
        private readonly middlewares: any[]
    ) {
        this.server.get("/user/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const response = await this.find.execute(req.params?.id);
                res.status(HttpStatus.OK).json(response);
            } catch (error: NotFoundException | any) {
                if (error instanceof NotFoundException)
                    res.sendStatus(HttpStatus.NOT_FOUND);
                else
                    res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
}