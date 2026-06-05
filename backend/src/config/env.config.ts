import dotenv from "dotenv"

dotenv.config();

function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is required`);
    }

    return value;
}

export const env = {
    PORT: Number(requiredEnv("PORT")),

    MONGODB_URI: requiredEnv("MONGODB_URI"),

    ACCESS_TOKEN_SECRET: requiredEnv("ACCESS_TOKEN_SECRET"),
    REFRESH_TOKEN_SECRET: requiredEnv("REFRESH_TOKEN_SECRET"),

    CLIENT_URL: requiredEnv("CLIENT_URL"),

    CORS_METHODS: requiredEnv("CORS_METHODS"),
    CORS_ALLOWED_HEADERS: requiredEnv("CORS_ALLOWED_HEADERS"),

    CORS_CREDENTIALS: requiredEnv("CORS_CREDENTIALS") === "true",

    NODE_ENV: requiredEnv("NODE_ENV"),

    COOKIE_MAX_AGE: requiredEnv("COOKIE_MAX_AGE"),
    COOKIE_SAME_SITE: requiredEnv("COOKIE_SAME_SITE"),
};