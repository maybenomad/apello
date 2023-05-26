import fs from "fs";
import path from "path";
import axios from "axios";
import sharp, { OverlayOptions } from "sharp";
import type { Config } from "../../../context/BannerContext";

export const buildStreetImage = async (config: Config) => {
  const baseImagePath = path.join(
    process.cwd(),
    "public/banners",
    "street.jpg"
  );
  const baseImageBuffer = fs.readFileSync(baseImagePath);
  const baseImage = sharp(baseImageBuffer);

  const image1 = await axios.get(config.selectedNFTs[0].image, {
    responseType: "arraybuffer",
  });
  const image2 = await axios.get(config.selectedNFTs[1].image, {
    responseType: "arraybuffer",
  });
  const image3 = await axios.get(config.selectedNFTs[2].image, {
    responseType: "arraybuffer",
  });

  const imageBuffer1 = await sharp(image1.data).resize(317, 317).toBuffer();
  const imageBuffer2 = await sharp(image2.data).resize(317, 317).toBuffer();
  const imageBuffer3 = await sharp(image3.data).resize(317, 317).toBuffer();
  const imageBufferReflection1 = await sharp(image1.data)
    .resize(317, 317)
    .flip()
    .blur(3)
    .toBuffer();
  const imageBufferReflection2 = await sharp(image2.data)
    .resize(317, 317)
    .flip()
    .blur(3)
    .toBuffer();
  const imageBufferReflection3 = await sharp(image3.data)
    .resize(317, 317)
    .flip()
    .blur(3)
    .toBuffer();

  const compositeOptions: OverlayOptions[] = [
    { input: imageBuffer1, left: 404, top: 91 },
    { input: imageBuffer2, left: 745, top: 91 },
    { input: imageBuffer3, left: 1086, top: 91 },
    {
      input: imageBufferReflection1,
      left: 404,
      top: 408,
      blend: "overlay",
    },
    {
      input: imageBufferReflection2,
      left: 745,
      top: 408,
      blend: "overlay",
    },
    {
      input: imageBufferReflection3,
      left: 1086,
      top: 408,
      blend: "overlay",
    },
  ];

  // Add Twitter username if provided
  if (config.twitterUsername?.length > 0) {
    const svgText = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1500" height="70" >
        <text x="1480" y="48" font-size="48" font-weigh="bold" text-anchor="end" font-family="Arial, Helvetica, sans-serif" fill="white">@${config.twitterUsername}</text>
      </svg>
    `);

    compositeOptions.push({
      input: svgText,
      left: 0,
      top: 430,
      blend: "over",
    });
  }

  const compositedImageBuffer = await baseImage
    .composite(compositeOptions)
    .jpeg({ mozjpeg: true })
    .toBuffer();

  return compositedImageBuffer.toString("base64");
};
