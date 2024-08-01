import { BadRequestException, UnauthorizedException } from "@/common/exceptions";
import { getAxiosInstance } from "../../util/get-axios-instance";
import { HttpStatus } from "@/common/utils/http-status";

describe("Login", () => {
    const axiosInstance = getAxiosInstance();

    it("should return http status code 400 bad request if email is invalid", async () => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: "",
                password: ""
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
                password: "anyPassword"
            });
        } catch ({ response }: any | BadRequestException) {
            expect(response.status).toBe(HttpStatus.NOT_FOUND);
            expect(response.data).toBe("Usuário não cadastrado");
        }
    });

    it("should return http status coder 400 bad request if password is undefined", async () => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email: "admin@gmail.com",
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
                email: "admin@gmail.com",
                password: "any_password"
            });
        } catch ({ response }: any | UnauthorizedException) {
            expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
            expect(response.data).toBe("Senha inválida");
        }
    });

    it("should return http status code 200 ok with accessToken if email and password are valid", async () => {
        try {
            const { data } = await axiosInstance.post("/auth/login", {
                email: "admin@gmail.com",
                password: "S3nh@admin"
            });
            expect(data.accessToken).toBeDefined();
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });

});