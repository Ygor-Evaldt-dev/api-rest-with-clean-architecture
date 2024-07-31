import { Status } from "@/domain/shared/enums/status";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsOptional, IsUUID, Length, MaxLength } from "class-validator";

export class CreateTaskDto {
    @Length(1, 50, { message: "Título deve ter no mínimo 1 caractere e no máximo 50 caracteres" })
    @Transform(({ value }) => value?.toString().trim().toLowerCase())
    readonly title: string;

    @IsOptional()
    @Transform(({ value }) => value?.toString().trim().toLowerCase())
    @IsEnum(Status, { message: "Status deve ser um dos seguintes: pendente, concluído, em andamento" })
    readonly status?: Status;

    @IsUUID("4", { message: "Chave de identificação de usuário inválida" })
    readonly userId: string;

    @IsOptional()
    @MaxLength(500, { message: "Descrição deve conter no máximo 150 caracteres" })
    @Transform(({ value }) => value?.toString().trim())
    readonly description?: string;

    constructor(
        title: string,
        status: Status,
        userId: string,
        description?: string
    ) {
        this.title = title;
        this.status = status;
        this.userId = userId;
        this.description = description;
    }
}