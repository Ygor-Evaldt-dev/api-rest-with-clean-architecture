import { Request, Response, Express } from "express";

import { HttpStatus } from "@/common/utils/http-status";
import { BadRequestException } from "@/common/exceptions/bad-request.exception";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { LoginService } from "@/application/services/auth/login.service";
import { handleRequestError, validateDto } from "@/presentation/util";
import { LoginDto } from "@/application/services/auth/dtos";

export class LoginController {
    constructor(
        private readonly server: Express,
        private readonly loginService: LoginService
    ) {
        this.server.post("/auth/login", async (req: Request, res: Response) => {
            try {
                const { email, password } = req.body;
                const dto = new LoginDto(email, password);
                await validateDto<LoginDto>(dto);

                const token = await this.loginService.execute(dto);
                res.status(HttpStatus.OK).json(token);
            } catch (error: NotFoundException | BadRequestException | any) {
                handleRequestError(res, error);
            }
        });
    }
}
