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

    CLOUDINARY_CLOUD_NAME: requiredEnv("CLOUDINARY_CLOUD_NAME"),
    CLOUDINARY_API_KEY: requiredEnv("CLOUDINARY_API_KEY"),
    CLOUDINARY_API_SECRET: requiredEnv("CLOUDINARY_API_SECRET"),

    REDIS_CLIENT_USERNAME: requiredEnv('REDIS_CLIENT_USERNAME'),
    REDIS_CLIENT_PASSWORD: requiredEnv('REDIS_CLIENT_PASSWORD'),
    REDIS_HOST: requiredEnv('REDIS_HOST'),
    REDIS_PORT: Number(requiredEnv('REDIS_PORT')),

    OTP_LENGTH: Number(requiredEnv('OTP_LENGTH')),
    OTP_TTL_SECONDS: Number(requiredEnv('OTP_TTL_SECONDS')),

    SMTP_HOST: requiredEnv('SMTP_HOST'),
    SMTP_PORT: Number(requiredEnv('SMTP_PORT')),
    SMTP_USER: requiredEnv('SMTP_USER'),
    SMTP_PASSWORD: requiredEnv('SMTP_PASSWORD'),
    SMTP_FROM_EMAIL: requiredEnv('SMTP_FROM_EMAIL'),

    
};