import { BadRequestException, UnauthorizedException } from "@/common/exceptions";
import { getAxiosInstance } from "../../util/get-axios-instance";
import { HttpStatus } from "@/common/utils/http-status";
import { getTestModules } from "../../../common/shared";

describe("Login", () => {
    const axiosInstance = getAxiosInstance();
    const { userModule } = getTestModules();

    const dto = {
        email: "auth@gmail.com",
        password: "Alth@test3"
    }

    beforeAll(async () => {
        await axiosInstance.post("/user", dto);
    });

    afterAll(async () => {
        const user = await userModule.find.execute({ email: dto.email });
        await userModule.remove.execute(user.id.value);
    });

    it("should return http status code 400 bad request if email is invalid", async () => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: "invalid",
                password: "any"
            });
        } catch ({ response }: any | BadRequestException) {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
            expect(response.data).toBe("E-mail inválido");
        }
    });

    it("should return http status code 404 not found if user is not existing", async () => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: "any@gmail.com",
                password: "password"
            });
        } catch ({ response }: any | BadRequestException) {
            expect(response.status).toBe(HttpStatus.NOT_FOUND);
            expect(response.data).toBe("Usuário não cadastrado");
        }
    });

    it("should return http status coder 400 bad request if password is undefined", async () => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: dto.email,
                password: undefined
            });
        } catch ({ response }: any | BadRequestException) {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
            expect(response.data).toBe("Senha é obrigatória");
        }
    });

    it("should return http status code 401 unauthorized if password is invalid", async () => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: dto.email,
                password: "invalid_password"
            });
        } catch ({ response }: any | UnauthorizedException) {
            expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
            expect(response.data).toBe("Senha inválida");
        }
    });

    it("should return http status code 200 ok with accessToken if email and password are valid", async () => {
        try {
            const { data } = await axiosInstance.post("/auth/login", {
                email: dto.email,
                password: dto.password
            });
            expect(data.accessToken).toBeDefined();
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });

});