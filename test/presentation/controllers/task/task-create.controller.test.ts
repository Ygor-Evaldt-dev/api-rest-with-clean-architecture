import { AxiosInstance } from "axios";
import { authenticatedAxiosInstance } from "../../../presentation/util";
import { HttpStatus } from "@/common/utils/http-status";

describe("task create controller", () => {
    let axiosInstance: AxiosInstance;

    beforeAll(async () => {
        axiosInstance = await authenticatedAxiosInstance();
    });

    afterAll(async () => {
        const { data } = await axiosInstance.get("/task/0/10");
        const { registers } = data;

        await axiosInstance.delete(`/task/${registers[0].id.value}`);
    });

    it("should return http status code 400 bad request if task title is invalid", async () => {
        try {
            await axiosInstance.post("/task", {
                title: ""
            });
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("should return http status code 400 bad request if task status is invalid", async () => {
        try {
            await axiosInstance.post("/task", {
                title: "Teste",
                status: "invalid"
            });
        } catch ({ response }: any) {
            expect(response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("should create a task for authenticated user", async () => {
        const { status } = await axiosInstance.post("/task", {
            title: "Teste"
        });
        expect(status).toBe(HttpStatus.CREATED);
    });
});