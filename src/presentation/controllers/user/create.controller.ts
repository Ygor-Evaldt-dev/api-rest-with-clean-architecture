import { ConflictException } from "@/application/common/exceptions/conflict.exeption";
import { CreateService } from "@/application/services/user/create.service";
import { HttpStatus } from "@/presentation/utils/http-status";
import { Express, Request, Response } from "express";

export class CreateController {
    constructor(
        private readonly server: Express,
        private readonly service: CreateService
    ) {
        this.server.post('/user', async (req: Request, res: Response) => {
            try {
                const dto = req.body;
                const user = await this.service.execute(dto);
                res.status(HttpStatus.CREATED).json(user);
            } catch (error: ConflictException | any) {
                res.status(HttpStatus.BAD_REQUEST).send(error.message);
            }
        })
    }
}