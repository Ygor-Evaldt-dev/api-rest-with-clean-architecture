import { BadRequestException } from "@/common/exceptions";
import { validate } from "class-validator";
import { getErrorMessage } from ".";

export async function validateDto<T extends Object>(dto: T): Promise<void> {
    const errors = await validate(dto);
    if (errors.length <= 0) return;

    const message = getErrorMessage(errors[0]);
    throw new BadRequestException(message);
}