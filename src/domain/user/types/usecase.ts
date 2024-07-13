import { Create } from "@/domain/user/use-cases/create.usecase";
import { FindUnique } from "@/domain/user/use-cases/find-unique.usecase";
import { Remove } from "@/domain/user/use-cases/remove.usecase";

export type Usecase = {
    create: Create;
    findUnique: FindUnique;
    remove: Remove
}