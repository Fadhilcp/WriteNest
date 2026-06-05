import cloudinary from "../config/cloudinary.config.js";

export function uploadToCloudinary(fileBuffer: Buffer, folder: string = "writenest_posts"): Promise<string> {

    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) return reject(error);
                resolve(result?.secure_url || "");
            }
        );
        uploadStream.end(fileBuffer);
    });
};