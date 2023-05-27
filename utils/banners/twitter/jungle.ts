import fs from "fs";
import path from "path";
import axios from "axios";
import sharp, { OverlayOptions } from "sharp";
import type { Config } from "../../../context/BannerContext";

export const buildJungleImage = async (config: Config) => {
  const baseImagePath = path.join(
    process.cwd(),
    "public/banners/twitter_header",
    "jungle.jpg"
  );
  const baseImageBuffer = fs.readFileSync(baseImagePath);
  const baseImage = sharp(baseImageBuffer);

  const overlayImagePath = path.join(
    process.cwd(),
    "public/banners/twitter_header",
    "jungle_overlay.png"
  );
  const overlayImageBuffer = fs.readFileSync(overlayImagePath);

  const image1 = await axios.get(config.selectedNFTs[0].image, {
    responseType: "arraybuffer",
  });
  const image2 = await axios.get(config.selectedNFTs[1].image, {
    responseType: "arraybuffer",
  });
  const image3 = await axios.get(config.selectedNFTs[2].image, {
    responseType: "arraybuffer",
  });

  const imageBuffer1 = await sharp(image1.data)
    .resize(271, 271)
    .rotate(-2, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const imageBuffer2 = await sharp(image2.data)
    .resize(305, 305)
    .rotate(2.3, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const imageBuffer3 = await sharp(image3.data)
    .resize(245, 245)
    .rotate(0.8, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const compositeOptions: OverlayOptions[] = [
    { input: imageBuffer1, left: 470, top: 123 },
    { input: imageBuffer2, left: 810, top: 94 },
    { input: imageBuffer3, left: 1176, top: 133 },
    { input: overlayImageBuffer, left: 0, top: 0 },
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
