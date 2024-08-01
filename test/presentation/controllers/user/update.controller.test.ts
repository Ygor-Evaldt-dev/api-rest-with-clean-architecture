import { BadRequestException } from "@/common/exceptions";
import { HttpStatus } from "@/common/utils/http-status";
import { AxiosInstance } from "axios";
import { authenticatedAxiosInstance } from "../../util/authenticated-axios-instance";

describe("update controller", () => {
    let axiosInstance: AxiosInstance;
    const userId = "53211d23-a8e0-4c58-8857-91d19d64fe27";

    beforeAll(async () => {
        axiosInstance = await authenticatedAxiosInstance();
    });

    it("should return http status 400 bad request if email is invalid", async () => {
        try {
            const response = await axiosInstance.patch(`/user/${userId}`, {
                email: "any"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.BAD_REQUEST);
            expect(error.response.data).toBe("Email inválido");
        }
    });

    it("should return http status 400 bad request if password is invalid", async () => {
        try {
            const response = await axiosInstance.patch(`/user/${userId}`, {
                password: "invalid"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.BAD_REQUEST);
            expect(error.response.data).toBe("Senha deve ter no mínimo 6 caracteres contendo no mínimo 1 número, 1 letra maiúscula e 1 caractere especial");
        }
    });

    it("should return http status 400 bad request if name is too short", async () => {
        try {
            const response = await axiosInstance.patch(`/user/${userId}`, {
                name: "no"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.BAD_REQUEST);
            expect(error.response.data).toBe("Nome deve ter no mínimo 3 e no máximo 150 caracteres");
        }
    });

    it("should return http status 400 bad request if name is too long", async () => {
        try {
            const response = await axiosInstance.patch(`/user/${userId}`, {
                name: "thisnameistoolongthisnameistoolongthisnameistoolongthisnameistoolongthisnameistoolongthisnameistoolongthisnameistoolongthisnameistoolongsnameistoolongthisnameistoolongthisnameistoolong"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.BAD_REQUEST);
            expect(error.response.data).toBe("Nome deve ter no mínimo 3 e no máximo 150 caracteres");
        }
    });

    it("should return http status 404 not found if user id is invalid", async () => {
        try {
            const response = await axiosInstance.patch(`/user/any`, {
                email: "admin@gmail.com"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.NOT_FOUND);
            expect(error.response.data).toBe("Registro não cadastrado");
        }
    });

    it("should return http status 400 not found if user is not existing", async () => {
        try {
            const userId = "fda10cf4-102a-4413-8669-711e39f28000"
            const response = await axiosInstance.patch(`/user/${userId}`, {
                email: "admin@gmail.com"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.NOT_FOUND);
            expect(error.response.data).toBe("Usuário não cadastrado");
        }
    });

    it("should return http status 200 ok and update an existing user", async () => {
        const { status, data } = await axiosInstance.patch(`/user/${userId}`, {
            email: "admin@gmail.com",
            name: "admin"
        });
        expect(status).toBe(HttpStatus.OK);
        expect(data.id.value).toBe(userId);
    });
});