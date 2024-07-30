import { NextFunction, Request, Response } from "express";
import { UuidAdapter } from "@/infra/adapters/uuid.adapter";
import { HttpStatus } from "@/common/utils/http-status";

export function uuidMiddleware() {
    return function (req: Request, res: Response, next: NextFunction) {
        const uuidAdapter = new UuidAdapter();

        const { id } = req.params;
        if (!id) return next();

        if (!uuidAdapter.validate(id))
            return res.status(HttpStatus.NOT_FOUND).send("Registro não cadastrado");

        next();
    }
}