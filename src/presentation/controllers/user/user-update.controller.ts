import { Request, Response, Express } from "express";

import { HttpStatus } from "@/common/utils/http-status";
import { handleRequestError, validateDto } from "@/presentation/util";
import { UpdateUserDto } from "@/domain/user/dtos";
import { UserUpdate } from "@/domain/user/use-cases";

export class UserUpdateController {
    constructor(
        private readonly server: Express,
        private readonly update: UserUpdate,
        private middlewares: any[]
    ) {
        this.server.patch("/user/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { email, password, name } = req.body;
                const dto = new UpdateUserDto(id, email, password, name);

                const response = await this.update.execute(dto);
                res.status(HttpStatus.OK).json(response);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}
