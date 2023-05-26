import fs from "fs";
import path from "path";
import axios from "axios";
import sharp, { OverlayOptions } from "sharp";
import type { Config } from "../../../context/BannerContext";

export const buildPixelWizardsImage = async (config: Config) => {
  const baseImagePath = path.join(
    process.cwd(),
    "public/banners",
    "pixel wizards.png"
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

  const imageBuffer1 = await sharp(image1.data)
    .resize(208, 208)
    .rotate(2, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const imageBuffer2 = await sharp(image2.data)
    .resize(208, 208)
    .rotate(-2, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const imageBuffer3 = await sharp(image3.data)
    .resize(208, 208)
    .rotate(1.01, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const compositeOptions: OverlayOptions[] = [
    { input: imageBuffer1, left: 196, top: 107 },
    { input: imageBuffer2, left: 543, top: 243 },
    { input: imageBuffer3, left: 974, top: 102 },
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
