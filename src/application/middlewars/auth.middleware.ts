import { IService } from "@/domain/shared/service.interface";
import { User } from "@prisma/client";

export class AuthMiddleware {
    constructor(
        private readonly findUnique: IService<string, User | null>
    ) { }
}