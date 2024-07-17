import { ConflictException } from "@/common/exceptions/conflict.exception";
import { HttpStatus } from "@/common/utils/http-status";
import { Express, Request, Response } from "express";
import { CreateService } from "@/application/services/user/create.service";

export class CreateController {
    constructor(
        private readonly server: Express,
        private readonly create: CreateService
    ) {
        this.server.post("/user", async (req: Request, res: Response) => {
            try {
                const dto = req.body;
                const response = await this.create.execute(dto);
                res.status(HttpStatus.CREATED).json(response);
            } catch (error: ConflictException | any) {
                if (error instanceof ConflictException)
                    res.status(HttpStatus.CONFLICT).send(error.message);
                else res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        });
    }
}
