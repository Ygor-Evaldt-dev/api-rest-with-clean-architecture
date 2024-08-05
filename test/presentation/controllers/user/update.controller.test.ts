import { BadRequestException } from "@/common/exceptions";
import { HttpStatus } from "@/common/utils/http-status";
import { AxiosInstance } from "axios";
import { authenticatedAxiosInstance } from "../../util/authenticated-axios-instance";
import { getExistingUser } from "../../../common/shared";

describe("update controller", () => {
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
    });

    it("should return http status 400 bad request if email is invalid", async () => {
        try {
            const response = await axiosInstance.patch(`/user/${userId}`, {
                email: "invalid"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("should return http status 400 bad request if password is invalid", async () => {
        try {
            const response = await axiosInstance.patch(`/user/${userId}`, {
                password: "invalid"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("should return http status 400 bad request if name is too short", async () => {
        try {
            const response = await axiosInstance.patch(`/user/${userId}`, {
                name: "in"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("should return http status 400 bad request if name is too long", async () => {
        try {
            const response = await axiosInstance.patch(`/user/${userId}`, {
                name: "thisnameistoolongthisnameistoolongthisnameistoolongthisnameistoolongthisnameistoolongthisnameistoolongthisnameistoolongthisnameistoolongsnameistoolongthisnameistoolongthisnameistoolong"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.BAD_REQUEST);
        }
    });

    it("should return http status 404 not found if user id is invalid", async () => {
        try {
            const id = "invalid"
            await axiosInstance.patch(`/user/${id}`, {
                email: "admin@gmail.com"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.NOT_FOUND);
        }
    });

    it("should return http status 400 not found if user is not existing", async () => {
        try {
            const userId = "fda10cf4-102a-4413-8669-711e39f28000"
            await axiosInstance.patch(`/user/${userId}`, {
                email: "admin@gmail.com"
            });
        } catch (error: BadRequestException | any) {
            expect(error.response.status).toBe(HttpStatus.NOT_FOUND);
        }
    });

    it("should return http status 200 ok and update an existing user", async () => {
        const { status, data } = await axiosInstance.patch(`/user/${userId}`, {
            nane: "teste"
        });
        expect(status).toBe(HttpStatus.OK);
    });
});