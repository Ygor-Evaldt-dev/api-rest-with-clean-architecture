import { User } from "@/domain/user/entity/user.entity";

export type UserToken = {
    user: User;
    iat: number;
    exp: number;
};
