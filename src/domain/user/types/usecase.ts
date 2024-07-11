import { Create } from "@/domain/user/use-cases/create.usecase";
import { FindUnique } from "../use-cases/find-unique.usecase";

export type Usecase = {
    create: Create,
    findUnique: FindUnique
}