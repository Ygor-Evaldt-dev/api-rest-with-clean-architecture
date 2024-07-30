import { BadRequestException, ConflictException, NotFoundException, UnauthorizedException } from "@/common/exceptions";
import { HttpStatus } from "@/common/utils/http-status";
import { Response } from "express";

export function handleRequestError(res: Response, error: any) {
    if (error instanceof NotFoundException)
        res.status(HttpStatus.NOT_FOUND).send(error.message);

    else if (error instanceof ConflictException)
        res.status(HttpStatus.CONFLICT).send(error.message);

    else if (error instanceof BadRequestException)
        res.status(HttpStatus.BAD_REQUEST).send(error.message);

    else if (error instanceof UnauthorizedException)
        res.status(HttpStatus.UNAUTHORIZED).send(error.message);

    else {
        console.error(error.message);
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}