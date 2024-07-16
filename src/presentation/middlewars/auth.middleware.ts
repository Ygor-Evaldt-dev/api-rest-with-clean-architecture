import { ITokenProvider } from "@/domain/ports/token-provider.interface";
import { HttpStatus } from "@/common/utils/http-status";
import { Request, Response, NextFunction } from "express";
import { UserToken } from "./user-token";
import { IService } from "@/domain/shared/service.interface";
import { User } from "@/domain/user/entity/user.entity";
import { NotFoundException } from "@/common/exceptions/not-found.exception";

export function authMiddleware(
    service: IService<string, User>,
    tokenProvider: ITokenProvider
) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        try {
            if (!authorization) {
                res.sendStatus(HttpStatus.UNAUTHORIZED);
                return;
            }

            const userToken = tokenProvider.validate(authorization.split(" ")[1]) as UserToken;
            const user = await service.execute(userToken.sub);

            (req as any).user = user;
            next();
        } catch (error: NotFoundException | any) {
            if (error instanceof NotFoundException)
                res.status(HttpStatus.NOT_FOUND).send(error.message);
            else
                res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
    }
}
