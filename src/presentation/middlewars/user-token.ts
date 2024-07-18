import { User } from "@/domain/user/entity/user.entity";

export type UserToken = {
    // sub: string;
    user: User;
    iat: number;
    exp: number;
};
