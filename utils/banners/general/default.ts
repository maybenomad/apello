import axios from "axios";
import fs from "fs";
import path from "path";
import sharp, { OverlayOptions } from "sharp";

import type { Config } from "../../../context/BannerContext";
import { RESIZE_OPTIONS } from "../constants";

export const buildDefaultImage = async (config: Config) => {
  const baseImagePath = path.join(
    process.cwd(),
    "public/banners/general",
    `${config.style}.jpg`
  );
  const baseImageBuffer = fs.readFileSync(baseImagePath);
  const baseImage = sharp(baseImageBuffer);

  const [image1, image2, image3] = await Promise.all(
    config.selectedNFTs.map((item) =>
      axios.get(item.nextURL, {
        responseType: "arraybuffer",
      })
    )
  );

  const [imageBuffer1, imageBuffer2, imageBuffer3] = await Promise.all([
    sharp(image1.data).png().resize(274, 274, RESIZE_OPTIONS).toBuffer(),
    sharp(image2.data).png().resize(274, 274, RESIZE_OPTIONS).toBuffer(),
    sharp(image3.data).png().resize(274, 274, RESIZE_OPTIONS).toBuffer(),
  ]);

  const compositeOptions: OverlayOptions[] = [
    { input: imageBuffer1, left: 464, top: 109 },
    { input: imageBuffer2, left: 810, top: 109 },
    { input: imageBuffer3, left: 1156, top: 109 },
  ];

  // Add Twitter username if provided
  if (config.twitterUsername?.length > 0) {
    const svgText = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1500" height="70">
      <text opacity="0.5" x="1480" y="48" font-size="48" font-weigh="bold" text-anchor="end" font-family="Arial, Helvetica, sans-serif" fill="white">@${config.twitterUsername}</text>
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
