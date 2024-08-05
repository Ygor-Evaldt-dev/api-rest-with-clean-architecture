import { AxiosInstance } from "axios";
import { authenticatedAxiosInstance } from "../../util/authenticated-axios-instance";
import { HttpStatus } from "@/common/utils/http-status";
import { getExistingUser } from "../../../common/shared";

describe("find controller", () => {
    let axiosInstance: AxiosInstance;
    let userId: string;

    beforeAll(async () => {
        const [authAxiosInstance, user] = await Promise.all([
            authenticatedAxiosInstance(),
            getExistingUser()
        ]);

        axiosInstance = authAxiosInstance;
        userId = user.id.value;
    });

    afterAll(async () => {
        await axiosInstance.delete(`/user/${userId}`);
    })

    it("should return http status 404 not found if user id is invalid", async () => {
        try {
            const id = "invalid";
            const response = await axiosInstance.get(`/user/${id}`);
        } catch (error: any) {
            expect(error.response.status).toBe(HttpStatus.NOT_FOUND);
        }
    });

    it("should return http status 404 not found if user is not existing", async () => {
        try {
            const id = "53211d23-a8e0-4c58-8857-91d19d64f000";
            const response = await axiosInstance.get(`/user/${id}`);
        } catch (error: any) {
            expect(error.response.status).toBe(HttpStatus.NOT_FOUND);
        }
    });

    it("should return http status 200 ok and an existing user", async () => {
        const { status, data } = await axiosInstance.get(`/user/${userId}`);

        expect(status).toBe(HttpStatus.OK);
        expect(data.id.value).toBe(userId);
    });
});