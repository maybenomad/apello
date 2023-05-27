import fs from "fs";
import path from "path";
import axios from "axios";
import sharp, { OverlayOptions } from "sharp";
import type { Config } from "../../../context/BannerContext";

export const buildPostersImage = async (config: Config) => {
  const baseImagePath = path.join(
    process.cwd(),
    "public/banners/twitter_header",
    "posters.jpg"
  );
  const baseImageBuffer = fs.readFileSync(baseImagePath);
  const baseImage = sharp(baseImageBuffer);

  const overlayImagePath = path.join(
    process.cwd(),
    "public/banners/twitter_header",
    "posters_overlay.png"
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
    .resize(290, 290)
    .rotate(5.3, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const imageBuffer2 = await sharp(image2.data)
    .resize(308, 308)
    .rotate(-1.5, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const imageBuffer3 = await sharp(image3.data)
    .resize(302, 302)
    .rotate(4, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const compositeOptions: OverlayOptions[] = [
    { input: imageBuffer1, left: 329, top: 46 },
    { input: imageBuffer2, left: 715, top: 74 },
    { input: imageBuffer3, left: 1085, top: 62 },
    { input: overlayImageBuffer, left: 0, top: 0 },
  ];

  // Add Twitter username if provided
  if (config.twitterUsername?.length > 0) {
    const svgText = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1500" height="70">
      <text stroke="black" stroke-width="1" x="1480" y="48" font-size="50" font-weigh="bold" text-anchor="end" font-family="Arial, Helvetica, sans-serif" fill="white">@${config.twitterUsername}</text>
    </svg>
    `);

    compositeOptions.push({
      input: svgText,
      left: 0,
      top: 430,
    });
  }

  const compositedImageBuffer = await baseImage
    .composite(compositeOptions)
    .jpeg({ mozjpeg: true })
    .toBuffer();

  return compositedImageBuffer.toString("base64");
};
