import { ITokenProvider } from "@/domain/ports/token-provider.interface";
import { HttpStatus } from "@/common/utils/http-status";
import { Request, Response, NextFunction } from "express";
import { UserToken } from "./user-token";
import { NotFoundException } from "@/common/exceptions/not-found.exception";
import { UserFindService } from "@/application/services/user/user-find.service";

export function authMiddleware(
    findService: UserFindService,
    tokenProvider: ITokenProvider
) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        try {
            if (!authorization) {
                res.sendStatus(HttpStatus.UNAUTHORIZED);
                return;
            }

            const accessToken = tokenProvider.validate(
                authorization.split(" ")[1]
            ) as UserToken;
            const user = await findService.execute({ id: accessToken.user.id.value });

            (req as any).user = user;
            next();
        } catch (error: NotFoundException | any) {
            if (error instanceof NotFoundException)
                res.status(HttpStatus.NOT_FOUND).send(error.message);
            else res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
    };
}
