import { HttpStatus } from "@/common/utils/http-status";
import { getAxiosInstance, authenticatedAxiosInstance } from "../../util";
import { getExistingUser, userDto } from "../../../common/shared";
import { User } from "@/domain/user/entity/user.entity";

describe("create controller", () => {
    const axiosInstance = getAxiosInstance();
    let user: User;

    beforeAll(async () => {
        user = await getExistingUser();
    });

    afterAll(async () => {
        const authHttp = await authenticatedAxiosInstance();
        await authHttp.delete(`/user/${user.id.value}`);
    });

    it("should return http status code 400 bad request if e-mail is invalid", async () => {
        try {
            const response = await axiosInstance.post("/user", {
                email: ""
            })
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("should return http status code 409 conflict if email is already registred", async () => {
        try {
            const response = await axiosInstance.post("/user", {
                email: user.email.complete,
                password: userDto.password
            })
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.CONFLICT);
        }
    });

    it("should return http status code 400 bad request if password is invalid", async () => {
        try {
            const response = await axiosInstance.post("/user", {
                email: `other_${userDto.email}`,
                password: "invalid"
            })
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("should return http status code 400 bad request if name is invalid", async () => {
        try {
            const response = await axiosInstance.post("/user", {
                email: `other_${userDto.email}`,
                password: userDto.password,
                name: "in"
            })
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it.skip("should create new user and return http status code 201 ", async () => {
        const body = {
            ...userDto,
            email: "other@gmail.com",
            name: "Teste"
        }

        const response = await axiosInstance.post("/user", body);
        expect(response.status).toBe(HttpStatus.CREATED);
    });
});
