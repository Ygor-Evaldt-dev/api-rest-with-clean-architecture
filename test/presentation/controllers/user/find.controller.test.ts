import { AxiosInstance } from "axios";
import { authenticatedAxiosInstance } from "../../../presentation/util/authenticated-axios-instance";
import { NotFoundException } from "@/common/exceptions";
import { HttpStatus } from "@/common/utils/http-status";

describe("find controller", () => {
    let axiosInstance: AxiosInstance;
    const userId = "53211d23-a8e0-4c58-8857-91d19d64fe27";
    beforeAll(async () => {
        axiosInstance = await authenticatedAxiosInstance();
    });

    it("should return http status 404 not found if user is not existing", async () => {
        try {
            const id = "53211d23-a8e0-4c58-8857-91d19d64f000";
            const response = await axiosInstance.get(`/user/${id}`);
        } catch (error: any | NotFoundException) {
            expect(error.response.status).toBe(HttpStatus.NOT_FOUND);
        }
    });
});