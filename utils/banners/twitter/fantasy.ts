import axios from "axios";
import fs from "fs";
import path from "path";
import sharp, { OverlayOptions } from "sharp";

import type { Config } from "../../../context/BannerContext";
import { RESIZE_OPTIONS } from "../constants";

export const buildFantasyImage = async (config: Config) => {
  const baseImagePath = path.join(
    process.cwd(),
    "public/banners/twitter_header",
    "fantasy.jpg"
  );
  const baseImageBuffer = fs.readFileSync(baseImagePath);
  const baseImage = sharp(baseImageBuffer);

  const [image1, image2, image3] = await Promise.all([
    axios.get(config.selectedNFTs[0].image, { responseType: "arraybuffer" }),
    axios.get(config.selectedNFTs[1].image, { responseType: "arraybuffer" }),
    axios.get(config.selectedNFTs[2].image, { responseType: "arraybuffer" }),
  ]);

  const [imageBuffer1, imageBuffer2, imageBuffer3] = await Promise.all([
    await sharp(image1.data)
      .png()
      .resize(252, 252, RESIZE_OPTIONS)
      .rotate(-2.8, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer(),
    await sharp(image2.data)
      .png()
      .resize(287, 287, RESIZE_OPTIONS)
      .rotate(1.2, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer(),
    await sharp(image3.data)
      .png()
      .resize(236, 236, RESIZE_OPTIONS)
      .rotate(-2, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer(),
  ]);

  const compositeOptions: OverlayOptions[] = [
    { input: imageBuffer1, left: 477, top: 121 },
    { input: imageBuffer2, left: 813, top: 107 },
    { input: imageBuffer3, left: 1189, top: 145 },
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
      blend: "overlay",
    });
  }

  const compositedImageBuffer = await baseImage
    .composite(compositeOptions)
    .jpeg({ mozjpeg: true })
    .toBuffer();

  return compositedImageBuffer.toString("base64");
};
