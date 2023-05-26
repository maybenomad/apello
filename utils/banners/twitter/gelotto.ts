import fs from "fs";
import path from "path";
import axios from "axios";
import sharp, { OverlayOptions } from "sharp";
import type { Config } from "../../../context/BannerContext";

export const buildGelottoImage = async (config: Config) => {
  const baseImagePath = path.join(
    process.cwd(),
    "public/banners",
    "gelotto.jpg"
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

  const imageBuffer1 = await sharp(image1.data).resize(280, 280).toBuffer();
  const imageBuffer2 = await sharp(image2.data).resize(280, 280).toBuffer();
  const imageBuffer3 = await sharp(image3.data).resize(280, 280).toBuffer();

  const compositeOptions: OverlayOptions[] = [
    { input: imageBuffer1, left: 502, top: 97 },
    { input: imageBuffer2, left: 828, top: 97 },
    { input: imageBuffer3, left: 1154, top: 97 },
  ];

  // Add Twitter username if provided
  if (config.twitterUsername?.length > 0) {
    const svgText = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1500" height="70">
      <text opacity="0.5" x="1480" y="48" font-size="48" font-weigh="bold" text-anchor="end" font-family="Arial, Helvetica, sans-serif" fill="black">@${config.twitterUsername}</text>
    </svg>
    `);

    compositeOptions.push({
      input: svgText,
      left: 0,
      top: 430,
      blend: "screen",
    });
  }

  const compositedImageBuffer = await baseImage
    .composite(compositeOptions)
    .jpeg({ mozjpeg: true })
    .toBuffer();

  return compositedImageBuffer.toString("base64");
};
