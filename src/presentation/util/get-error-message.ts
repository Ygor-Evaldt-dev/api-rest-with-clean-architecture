import { ValidationError } from "class-validator";

export function getErrorMessage(error: ValidationError): string {
    const message = Object.values(error.constraints!)[0];
    return message;
}