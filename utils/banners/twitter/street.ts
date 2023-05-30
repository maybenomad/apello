import axios from "axios";
import fs from "fs";
import path from "path";
import sharp, { OverlayOptions } from "sharp";

import type { Config } from "../../../context/BannerContext";
import { RESIZE_OPTIONS } from "../constants";

export const buildStreetImage = async (config: Config) => {
  const baseImagePath = path.join(
    process.cwd(),
    "public/banners/twitter_header",
    "street.jpg"
  );
  const baseImageBuffer = fs.readFileSync(baseImagePath);
  const baseImage = sharp(baseImageBuffer);

  const [image1, image2, image3] = await Promise.all([
    axios.get(config.selectedNFTs[0].image, { responseType: "arraybuffer" }),
    axios.get(config.selectedNFTs[1].image, { responseType: "arraybuffer" }),
    axios.get(config.selectedNFTs[2].image, { responseType: "arraybuffer" }),
  ]);

  const [
    imageBuffer1,
    imageBuffer2,
    imageBuffer3,
    imageBufferReflection1,
    imageBufferReflection2,
    imageBufferReflection3,
  ] = await Promise.all([
    await sharp(image1.data).png().resize(317, 317, RESIZE_OPTIONS).toBuffer(),
    await sharp(image2.data).png().resize(317, 317, RESIZE_OPTIONS).toBuffer(),
    await sharp(image3.data).png().resize(317, 317, RESIZE_OPTIONS).toBuffer(),
    await sharp(image1.data)
      .png()
      .resize(317, 317, RESIZE_OPTIONS)
      .flip()
      .blur(3)
      .toBuffer(),
    await sharp(image2.data)
      .png()
      .resize(317, 317, RESIZE_OPTIONS)
      .flip()
      .blur(3)
      .toBuffer(),
    await sharp(image3.data)
      .png()
      .resize(317, 317, RESIZE_OPTIONS)
      .flip()
      .blur(3)
      .toBuffer(),
  ]);

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
