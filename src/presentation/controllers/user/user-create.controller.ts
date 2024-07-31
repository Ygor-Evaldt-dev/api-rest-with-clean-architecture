import { Express, Request, Response } from "express";
import { HttpStatus } from "@/common/utils/http-status";
import { UserCreateService } from "@/application/services/user/user-create.service";
import { CreateUserDto } from "@/application/services/user/dtos";
import { handleRequestError, validateDto } from "@/presentation/util";

export class UserCreateController {
    constructor(
        private readonly server: Express,
        private readonly create: UserCreateService
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
