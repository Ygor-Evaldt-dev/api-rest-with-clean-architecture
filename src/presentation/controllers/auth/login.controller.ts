import { Request, Response, Express } from "express";
import { LoginDto } from "@/application/services/auth/dtos/login.dto";
import { TokenDto } from "@/application/services/auth/dtos/token.dto";
import { HttpStatus } from "@/common/utils/http-status";
import { IService } from "@/domain/shared/service.interface";

export class LoginController {
    constructor(
        private readonly server: Express,
        private readonly login: IService<LoginDto, TokenDto>
    ) {
        this.server.post('/auth/login', async (req: Request, res: Response) => {
            try {
                const dto = req.body;
                const token = await this.login.execute(dto);
                res.status(HttpStatus.OK).json(token);
            } catch (error: any) {
                res.status(HttpStatus.UNAUTHORIZED).send(error.message);
            }
        })
    }
}