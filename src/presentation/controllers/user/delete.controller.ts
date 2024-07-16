import { Request, Response, Express } from "express";

import { IService } from "@/domain/shared/service.interface";
import { HttpStatus } from "@/common/utils/http-status";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { ConflictException } from "@/common/exceptions/conflict.exception";

export class DeleteController {
	constructor(
		private readonly server: Express,
		private readonly remove: IService<string, void>,
		private middlewares: any[]
	) {
		this.server.delete(
			"/user/:id",
			...this.middlewares,
			async (req: Request, res: Response) => {
				try {
					await this.remove.execute(req.params.id);
					res.sendStatus(HttpStatus.OK);
				} catch (error: NotFoundException | ConflictException | any) {
					if (error instanceof NotFoundException)
						res.status(HttpStatus.NOT_FOUND).send(error.message);
					else res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}
		);
	}
}
