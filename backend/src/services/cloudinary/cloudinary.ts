import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { unlinkSync } from "fs";
export class CloudinaryService {
  config = () => {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  };

  uploadImage = async (localFilePath: string, originalname: string, mainFolderName: string) => {
    let filePathOnCloudinary = mainFolderName + "/" + originalname;
    return cloudinary.uploader
      .upload(localFilePath, {
        public_id: filePathOnCloudinary,
      })
      .then((result: UploadApiResponse) => {
        unlinkSync(localFilePath);
        return {
          message: "success",
          public_id: result.public_id,
          url: result.url,
          width: result.width,
          height: result.height,
        };
      })
      .catch((error) => {
        unlinkSync(localFilePath);
        console.log(error);
        throw new Error("failed to upload!");
      });
  };

  removeFromCloudinary = async (public_id: string) => {
    await cloudinary.uploader
      .destroy(public_id)
      .then((result) => {
        return {
          message: "success",
          isDelete: true,
        };
      })
      .catch((error) => {
        throw new Error("failed to remove!");
      });
  };
}
