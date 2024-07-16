import { FindService } from "@/application/services/user/find.service";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { HttpStatus } from "@/common/utils/http-status";
import { Request, Response, Express } from "express";

export class FindController {
	constructor(
		private readonly server: Express,
		private readonly findService: FindService,
		private readonly middlewares: any[]
	) {
		this.server.get(
			"/user/:id",
			...this.middlewares,
			async (req: Request, res: Response) => {
				try {
					const response = await this.findService.execute({
						id: req.params?.id
					});
					res.status(HttpStatus.OK).json(response);
				} catch (error: NotFoundException | any) {
					if (error instanceof NotFoundException)
						res.sendStatus(HttpStatus.NOT_FOUND);
					else res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
				}
			}
		);
	}
}
