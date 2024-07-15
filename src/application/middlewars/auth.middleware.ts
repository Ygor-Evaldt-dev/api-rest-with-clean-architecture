import { ITokenProvider } from "@/domain/ports/token-provider.interface";
import { IService } from "@/domain/shared/service.interface";
import { HttpStatus } from "@/common/utils/http-status";
import { User } from "@/domain/user/entity/user.entity";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(
    findUnique: IService<string, User | null>,
    tokenProvider: ITokenProvider
) {
    return async function (req: Request, res: Response, next: NextFunction) {
        const authorization = req.headers.authorization;

        try {
            if (!authorization) {
                res.sendStatus(HttpStatus.UNAUTHORIZED);
                return;
            }

            const userToken = tokenProvider.validate(authorization.split(" ")[1]) as User;
            const user = await findUnique.execute(userToken.email.complete);
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
