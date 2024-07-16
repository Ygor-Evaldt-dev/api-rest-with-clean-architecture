import { Request, Response, Express } from "express";
import { LoginDto } from "@/application/services/auth/dtos/login.dto";
import { TokenDto } from "@/application/services/auth/dtos/token.dto";
import { HttpStatus } from "@/common/utils/http-status";
import { IService } from "@/domain/shared/service.interface";
import { BadRequestException } from "@/common/exceptions/bad-request.exception";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { LoginService } from "@/application/services/auth/login.service";

export class LoginController {
	constructor(
		private readonly server: Express,
		private readonly loginService: LoginService
	) {
		this.server.post("/auth/login", async (req: Request, res: Response) => {
			try {
				const dto = req.body;
				const token = await this.loginService.execute(dto);
				res.status(HttpStatus.OK).json(token);
			} catch (error: NotFoundException | BadRequestException | any) {
				if (error instanceof NotFoundException)
					res.status(HttpStatus.NOT_FOUND).send(error.message);
				else if (error instanceof BadRequestException)
					res.status(HttpStatus.UNAUTHORIZED).send(error.message);
				else res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		});
	}
}
