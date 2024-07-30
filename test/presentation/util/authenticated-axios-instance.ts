import { getAxiosInstance } from "./get-axios-instance";

export async function authenticatedAxiosInstance() {
    const axiosInstance = getAxiosInstance();
    const { data } = await axiosInstance.post("/auth/login", {
        email: "admin@gmail.com",
        password: "S3nh@admin"
    });

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
    return axiosInstance;
}