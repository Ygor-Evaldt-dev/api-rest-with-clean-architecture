import { ConflictException } from "@/common/exceptions/conflict.exeption";
import { CreateService } from "@/application/services/user/create.service";
import { CreateUserDto } from "@/application/services/user/dtos/create-user.dto";
import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user/entity/user.entity";
import { HttpStatus } from "@/common/utils/http-status";
import { Express, Request, Response } from "express";

export class CreateController {
    constructor(
        private readonly server: Express,
        private readonly create: IService<CreateUserDto, User>
    ) {
        this.server.post('/user', async (req: Request, res: Response) => {
            try {
                const dto = req.body;
                const user = await this.create.execute(dto);
                res.status(HttpStatus.CREATED).json(user);
            } catch (error: ConflictException | any) {
                res.status(HttpStatus.BAD_REQUEST).send(error.message);
            }
        })
    }
}