import { ITokenProvider } from "@/domain/ports/token-provider.interface";
import { HttpStatus } from "@/common/utils/http-status";
import { Request, Response, NextFunction } from "express";
import { FindUnique } from "@/domain/user/use-cases/find-unique.usecase";
import { UserToken } from "./user-token";

export function authMiddleware(
    findUnique: FindUnique,
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
            const user = await findUnique.execute({ id: userToken.sub });
            if (user === null) {
                res.status(HttpStatus.NOT_FOUND).send('Usuário não cadastrado');
                return;
            }

            (req as any).user = user;
            next();
        } catch (error: any) {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
    }
}
