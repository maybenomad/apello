import axios from "axios";
import fs from "fs";
import path from "path";
import sharp, { OverlayOptions } from "sharp";

import type { Config } from "../../../context/BannerContext";
import { RESIZE_OPTIONS } from "../constants";

export const buildGeneralPostersImage = async (config: Config) => {
  const baseImagePath = path.join(
    process.cwd(),
    "public/banners/general/",
    "posters.jpg"
  );
  const baseImageBuffer = fs.readFileSync(baseImagePath);
  const baseImage = sharp(baseImageBuffer);

  const overlayImagePath = path.join(
    process.cwd(),
    "public/banners/general/",
    "posters_overlay.png"
  );
  const overlayImageBuffer = fs.readFileSync(overlayImagePath);

  const [image1, image2, image3] = await Promise.all(
    config.selectedNFTs.map((item) =>
      axios.get(item.nextURL, {
        responseType: "arraybuffer",
      })
    )
  );

  const [imageBuffer1, imageBuffer2, imageBuffer3] = await Promise.all([
    await sharp(image1.data)
      .png()
      .resize(317, 317, RESIZE_OPTIONS)
      .rotate(5.3, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer(),
    await sharp(image2.data)
      .png()
      .resize(342, 342, RESIZE_OPTIONS)
      .rotate(-1.5, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer(),
    await sharp(image3.data)
      .png()
      .resize(330, 330, RESIZE_OPTIONS)
      .rotate(4, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer(),
  ]);

  const compositeOptions: OverlayOptions[] = [
    { input: imageBuffer1, left: 47, top: 144 },
    { input: imageBuffer2, left: 460, top: 174 },
    { input: imageBuffer3, left: 882, top: 160 },
    { input: overlayImageBuffer, left: 0, top: 0 },
  ];

  // Add Twitter username if provided
  if (config.twitterUsername?.length > 0) {
    const svgText = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="70">
      <text stroke="black" stroke-width="1" x="1260" y="48" font-size="46" font-weigh="bold" text-anchor="end" font-family="Arial, Helvetica, sans-serif" fill="white">@${config.twitterUsername}</text>
    </svg>
    `);

    compositeOptions.push({
      input: svgText,
      left: 0,
      top: 660,
    });
  }

  const compositedImageBuffer = await baseImage
    .composite(compositeOptions)
    .jpeg({ mozjpeg: true })
    .toBuffer();

  return compositedImageBuffer.toString("base64");
};
