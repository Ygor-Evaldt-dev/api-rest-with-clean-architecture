import { create, request } from "axios";
import { config } from "dotenv";
config();

const { BASE_URL, PORT } = process.env;

export function getAxiosInstance() {
    return create({
        baseURL: `${BASE_URL}:${PORT}`,
        maxBodyLength: Infinity,
        headers: {
            "Content-Type": "application/json"
        }
    });
}