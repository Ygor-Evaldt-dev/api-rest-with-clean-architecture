import { Request, Response, Express } from "express";
import { HttpStatus } from "@/common/utils/http-status";
import { AuthLoginService } from "@/application/services/auth/auth-login.service";
import { handleRequestError, validateDto } from "@/presentation/util";
import { LoginDto } from "@/application/services/auth/dtos";

export class AuthLoginController {
    constructor(
        private readonly server: Express,
        private readonly loginService: AuthLoginService
    ) {
        this.server.post("/auth/login", async (req: Request, res: Response) => {
            try {
                const { email, password } = req.body;
                const dto = new LoginDto(email, password);
                await validateDto<LoginDto>(dto);

                const token = await this.loginService.execute(dto);
                res.status(HttpStatus.OK).json(token);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}
