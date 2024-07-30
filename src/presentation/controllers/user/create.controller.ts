import { ConflictException } from "@/common/exceptions/conflict.exception";
import { HttpStatus } from "@/common/utils/http-status";
import { Express, Request, Response } from "express";
import { CreateService } from "@/application/services/user/create.service";
import { CreateUserDto } from "@/application/services/user/dtos";
import { BadRequestException } from "@/common/exceptions";
import { handleRequestError, validateDto } from "@/presentation/util";

export class CreateController {
    constructor(
        private readonly server: Express,
        private readonly create: CreateService
    ) {
        this.server.post("/user", async (req: Request, res: Response) => {
            try {
                const { email, password, name } = req.body;

                const dto = new CreateUserDto(email, password, name);
                await validateDto<CreateUserDto>(dto);

                const response = await this.create.execute(dto);
                res.status(HttpStatus.CREATED).json(response);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}
