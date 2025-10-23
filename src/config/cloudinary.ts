import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { env } from "./env";
import stream from "stream";
import AppError from "../error/AppError";

cloudinary.config({
  cloud_name: env.Cloudinary.Cloud_Name,
  api_key: env.Cloudinary.Api_Key,
  api_secret: env.Cloudinary.Api_Secret,
});

export const deleteImageFromCloudinary = async (url: string) => {
  try {
    const regex = /\/v\d+\/(.*?)\.(jpg|png|gif|jpeg|webp)$/i;
    const match = url.match(regex);
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId);
      console.log(`File ${publicId} deleted from cloudinary`);
    }
  } catch (error) {
    throw new AppError(
      500,
      "Error deleting image from cloudinary",
      error instanceof Error ? error.message : String(error)
    );
  }
};

export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  filename: string
): Promise<UploadApiResponse | undefined> => {
  try {
    return new Promise((resolve, reject) => {
      const publicId = `portfolio/${filename}-${Date.now()}`;
      const bufferStream = new stream.PassThrough();
      bufferStream.end(buffer);

      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "portfolio",
            public_id: publicId,
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        )
        .end(buffer);
    });
  } catch (error) {
    console.log(error);
    throw new AppError(
      500,
      `Error uploading file to cloudinary. ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

export const CloudinaryUpload = cloudinary;
