import { HttpStatus } from "@/common/utils/http-status";
import { getAxiosInstance } from "../../util/get-axios-instance";

describe("create controller", () => {
    const axiosInstance = getAxiosInstance();

    it("should return http status code 400 bad request if e-mail is invalid", async () => {
        try {
            const response = await axiosInstance.post("/user", {
                email: ""
            })
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
            expect(response.data).toBe("Email inválido");
        }
    });

    it("should return http status code 409 conflict if email is already registred", async () => {
        try {
            const response = await axiosInstance.post("/user", {
                email: "admin@gmail.com",
                password: "S3nh@admin"
            })
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.CONFLICT);
            expect(response.data).toBe("Usuário já cadastrado");
        }
    });

    it("should return http status code 400 bad request if password is invalid", async () => {
        try {
            const response = await axiosInstance.post("/user", {
                email: "admin@gmail.com",
                password: "senha"
            })
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
            expect(response.data).toBe("Senha deve ter no mínimo 6 caracteres contendo no mínimo 1 número, 1 letra maiúscula e 1 caractere especial");
        }
    });

    it("should return http status code 400 bad request if name is invalid", async () => {
        try {
            const response = await axiosInstance.post("/user", {
                email: "admin@gmail.com",
                password: "S3nh@admin",
                name: "an"
            })
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
            expect(response.data).toBe("Nome deve ter no mínimo 3 e no máximo 150 caracteres");
        }
    });

    it.skip("should create new user and return http status code 201 ", async () => {
        const body = {
            email: "admin_teste@gmail.com",
            password: "S3nh@admin",
            name: "admin teste"
        }

        const response = await axiosInstance.post("/user", body);
        expect(response.status).toBe(HttpStatus.CREATED);
        expect(response.data).toHaveProperty("id")
        expect(response.data.name.complete.trim().toLowerCase()).toBe(body.name);

    });
});
