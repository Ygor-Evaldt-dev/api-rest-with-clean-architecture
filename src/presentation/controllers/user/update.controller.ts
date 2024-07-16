import { Request, Response, Express } from "express";

import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user/entity/user.entity";
import { UpdateUserDto } from "@/application/services/user/dtos/update-user.dto";
import { HttpStatus } from "@/common/utils/http-status";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { ConflictException } from "@/common/exceptions/conflict.exception";

export class UpdateController {
	constructor(
		private readonly server: Express,
		private readonly update: IService<UpdateUserDto, User>,
		private middlewares: any[]
	) {
		this.server.patch(
			"/user/:id",
			...this.middlewares,
			async (req: Request, res: Response) => {
				try {
					const dto = { ...req.body, id: req.params.id };
					const response = await this.update.execute(dto);
					res.status(HttpStatus.OK).json(response);
				} catch (error: NotFoundException | ConflictException | any) {
					if (error instanceof NotFoundException)
						res.status(HttpStatus.NOT_FOUND).send(error.message);
					else if (error instanceof ConflictException)
						res.status(HttpStatus.CONFLICT).send(error.message);
					else res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}
		);
	}
}
