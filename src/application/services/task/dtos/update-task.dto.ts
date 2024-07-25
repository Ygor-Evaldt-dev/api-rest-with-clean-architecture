import { Status } from "@/domain/shared/enums/status";
import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsUUID, Length, MaxLength } from "class-validator";

export class UpdateTaskDto {
    @IsUUID("4", { message: "A chave de identificação da tarefa é inválida" })
    readonly id: string;

    @IsOptional()
    @Length(1, 50, { message: "Título deve ter no mínimo 1 caractere e no máximo 50 caracteres" })
    @Transform(({ value }) => value?.toString().trim().toLowerCase())
    readonly title?: string;

    @IsOptional()
    @MaxLength(500, { message: "Descrição deve conter no máximo 150 caracteres" })
    @Transform(({ value }) => value?.toString().trim())
    readonly description?: string;

    @IsOptional()
    @Transform(({ value }) => value?.toString().trim().toLowerCase())
    @IsEnum(Status, { message: "Status deve ser um dos seguintes: pendente, concluído, em andamento" })
    readonly status?: Status;

    constructor(
        id: string,
        title?: string,
        description?: string,
        status?: Status
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }
}