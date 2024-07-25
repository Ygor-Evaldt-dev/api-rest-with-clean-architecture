import { Request, Response, Express } from "express";

import { HttpStatus } from "@/common/utils/http-status";
import { UpdateService } from "@/application/services/user/update.service";
import { handleRequestError, validateDto } from "@/presentation/util";
import { UpdateUserDto } from "@/application/services/user/dtos";

export class UpdateController {
    constructor(
        private readonly server: Express,
        private readonly update: UpdateService,
        private middlewares: any[]
    ) {
        this.server.patch("/user/:id", ...this.middlewares, async (req: Request, res: Response) => {
            try {
                const { id } = req.params;
                const { email, password, name } = req.body;

                const dto = new UpdateUserDto(id, email, password, name);
                await validateDto<UpdateUserDto>(dto);

                const response = await this.update.execute(dto);
                res.status(HttpStatus.OK).json(response);
            } catch (error: any) {
                handleRequestError(res, error);
            }
        });
    }
}
