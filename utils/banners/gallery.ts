import fs from "fs";
import path from "path";
import axios from "axios";
import sharp from "sharp";
import type { Config } from "../../context/BannerContext";

export const buildGalleryImage = async (config: Config) => {
  const baseImagePath = path.join(
    process.cwd(),
    "public/banners",
    "gallery1.png"
  );
  const baseImageBuffer = fs.readFileSync(baseImagePath);
  const baseImage = sharp(baseImageBuffer);

  const overlayImagePath = path.join(
    process.cwd(),
    "public/banners",
    "gallery2.png"
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

  const imageBuffer1 = await sharp(image1.data).resize(242, 242).toBuffer();
  const imageBuffer2 = await sharp(image2.data).resize(242, 242).toBuffer();
  const imageBuffer3 = await sharp(image3.data).resize(242, 242).toBuffer();

  let svgText: Buffer;
  if (config.twitterUsername) {
    svgText = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1500" height="70">
        <text opacity="0.5" x="1480" y="48" font-size="48" font-weigh="bold" text-anchor="end" font-family="Arial, Helvetica, sans-serif" fill="white">@${config.twitterUsername}</text>
      </svg>
    `);
  }

  const compositedImageBuffer = await baseImage
    .composite([
      { input: imageBuffer1, left: 228, top: 87 },
      { input: imageBuffer2, left: 628, top: 87 },
      { input: imageBuffer3, left: 1027, top: 87 },
      { input: overlayImageBuffer, left: 0, top: 0 },
      { input: svgText, left: 0, top: 430 },
    ])
    .jpeg({ mozjpeg: true })
    .toBuffer();

  return compositedImageBuffer.toString("base64");
};
