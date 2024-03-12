import AWS, { S3 } from "aws-sdk";
import { Readable } from "stream";
import axios from "axios";
import fs from "fs";

AWS.config.update({
  accessKeyId: process.env.AWS_AK,
  secretAccessKey: process.env.AWS_SK,
});

const s3 = new AWS.S3();

// const s3Client = new S3.S3Client({ region: "us-west-2" });

export async function downloadAndUploadImage(
  imageUrl: string,
  bucketName: string,
  s3Key: string,
) {
  console.log(
    `${process.env.AWS_AK} ${process.env.AWS_SK} ${imageUrl} ${bucketName} ${s3Key}`,
  );
  try {
    const response = await axios({
      method: "GET",
      url: imageUrl,
      responseType: "stream",
    });

    console.log("response 成功");

    const uploadParams = {
      Bucket: bucketName,
      Key: s3Key,
      Body: response.data as Readable,
    };

    console.log(typeof response.data);

    return s3.upload(uploadParams).promise();
  } catch (e) {
    console.log("upload failed:", e);
    throw e;
  }
}

export async function downloadImage(imageUrl: string, outputPath: string) {
  try {
    const response = await axios({
      method: "GET",
      url: imageUrl,
      responseType: "stream",
    });

    return new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      let error: Error | null = null;
      writer.on("error", (err) => {
        error = err;
        writer.close();
        reject(err);
      });

      writer.on("close", () => {
        if (!error) {
          resolve(null);
        }
      });
    });
  } catch (e) {
    console.log("upload failed:", e);
    throw e;
  }
}
