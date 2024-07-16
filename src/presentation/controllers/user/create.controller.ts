import { ConflictException } from "@/common/exceptions/conflict.exception";
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
		this.server.post("/user", async (req: Request, res: Response) => {
			try {
				const dto = req.body;
				const response = await this.create.execute(dto);
				res.status(HttpStatus.CREATED).json(response);
			} catch (error: ConflictException | any) {
				if (error instanceof ConflictException)
					res.status(HttpStatus.CONFLICT).send(error.message);
				else res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		});
	}
}
