import { AxiosInstance } from "axios";
import { HttpStatus } from "@/common/utils/http-status";
import { authenticatedAxiosInstance } from "../../util/authenticated-axios-instance";

describe("delete controller", () => {
    let id: string;
    let axiosInstance: AxiosInstance;

    beforeAll(async () => {
        axiosInstance = await authenticatedAxiosInstance();

        const { data } = await axiosInstance.post("/user", {
            email: "teste@gmail.com",
            password: "S3nh@teste"
        });

        id = data?.id?.value;
    });

    it("should return http status 404 not found if para 'id' is invalid", async () => {
        try {
            const invalidUuidV4 = "invalid";
            await axiosInstance.delete(`user/${invalidUuidV4}`);
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.NOT_FOUND);
            expect(response.data).toBe("Registro não cadastrado");
        }
    });

    it("should return http status 404 not found if the register doesn't exists", async () => {
        try {
            const uuidV4 = "0be59264-2590-4554-895d-d82935666be0";
            await axiosInstance.delete(`/user/${uuidV4}`);
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.NOT_FOUND);
        }
    });

    it("should return http status 200 ok is user has been deleted", async () => {
        const { status } = await axiosInstance.delete(`/user/${id}`);
        expect(status).toBe(HttpStatus.OK);
    });
});
