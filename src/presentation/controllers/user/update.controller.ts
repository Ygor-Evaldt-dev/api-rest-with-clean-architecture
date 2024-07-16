import { Request, Response, Express } from "express";

import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user/entity/user.entity";
import { UpdateUserDto } from "@/application/services/user/dtos/update-user.dto";
import { HttpStatus } from "@/common/utils/http-status";
import { ConflictException } from "@/common/exceptions/conflict.exception";
import { NotFoundException } from "@/common/exceptions/not-found.exception";

export class UpdateController {
    constructor(
        private readonly server: Express,
        private readonly update: IService<UpdateUserDto, User>,
        private middlewares: any[]
    ) {
        this.server.patch('/user/:id', ...middlewares, async (req: Request, res: Response) => {
            try {
                const dto = { ...req.body, id: req.params.id };
                const user = await this.update.execute(dto);

                res.status(HttpStatus.OK).json(user);
            } catch (error: NotFoundException | any) {
                res.status(HttpStatus.BAD_REQUEST).send(error.message);
            }
        })
    }
}