import { Request, Response, Express } from "express";
import { HttpStatus } from "@/common/utils/http-status";
import { AuthEmailPasswordService } from "@/application/services/auth/auth-email-password.service";
import { handleRequestError } from "@/presentation/util";
import { LoginDto } from "@/application/services/auth/dtos";

export class AuthLoginController {
    constructor(
        private readonly server: Express,
        private readonly emailPassword: AuthEmailPasswordService
    ) {
        this.server.post("/auth/login", async (req: Request, res: Response) => {
            try {
                const { email, password } = req.body;
                const dto = new LoginDto(email, password);

                const token = await this.emailPassword.execute(dto);
                res.status(HttpStatus.OK).json(token);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}
