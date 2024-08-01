import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { config } from "dotenv";
import { join } from "path";
import { getSchemas, getTags, getInfo } from "./";

config();

const { BASE_URL, PORT } = process.env;

const swaggerDefinition = {
    openapi: "3.0.0",
    info: getInfo(),
    tags: getTags(),
    servers: [
        {
            url: `${BASE_URL}:${PORT}`,
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        },
        schemas: getSchemas()
    },
    security: []
};

const pathToSwaggerConfigFiles = join(__dirname, "../*.yaml");
const options = {
    swaggerDefinition,
    apis: [pathToSwaggerConfigFiles]
};
const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
