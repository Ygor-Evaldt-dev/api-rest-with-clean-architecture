//Setup express server.
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(
	cors({
		origin: "*"
	})
);

const { PORT, BASE_URL } = process.env;
server.listen(PORT, () => {
	console.log(`Server online on ${BASE_URL}:${PORT}`);
});

export { server };
