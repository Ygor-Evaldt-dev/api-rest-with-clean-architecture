import { LoginDto } from "@/application/services/auth/dtos";
import { getAxiosInstance } from "./get-axios-instance";
import { userDto } from "../../common/shared/user-mock";

export async function authenticatedAxiosInstance(dto?: LoginDto) {
    const axiosInstance = getAxiosInstance();
    const { data } = await axiosInstance.post("/auth/login", {
        email: dto?.email?.complete ?? "admin@gmail.com",
        password: dto ? userDto.password : "S3nh@admin"
    });

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
    return axiosInstance;
}