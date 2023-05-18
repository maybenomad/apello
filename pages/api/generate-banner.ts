import fs from "fs";
import path from "path";
import axios from "axios";
import sharp from "sharp";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = { error: string } | string;

const buildFantasyImage = async (config: any) => {
  const baseImagePath = path.join(
    process.cwd(),
    "public/banners",
    "fantasy.jpg"
  );
  const baseImageBuffer = fs.readFileSync(baseImagePath);
  const baseImage = await sharp(baseImageBuffer);

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
    .resize(252, 252)
    .png()
    .rotate(-2.8, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const imageBuffer2 = await sharp(image2.data)
    .resize(287, 287)
    .rotate(1.2, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();
  const imageBuffer3 = await sharp(image3.data)
    .resize(236, 236)
    .rotate(-2, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  let svgText;
  if (config.twitterUsername) {
    svgText = Buffer.from(`
      <svg xmlns="http://www.w3.org/2000/svg" width="1500" height="70" >
        <text x="1480" y="48" font-size="48" font-weigh="bold" text-anchor="end" font-family="Arial, Helvetica, sans-serif" fill="white">@${config.twitterUsername}</text>
      </svg>
    `);
  }

  const compositedImageBuffer = await baseImage
    .composite([
      { input: imageBuffer1, left: 477, top: 121 },
      { input: imageBuffer2, left: 813, top: 107 },
      { input: imageBuffer3, left: 1189, top: 145 },
      { input: svgText, left: 0, top: 430, blend: "overlay" },
    ])
    .jpeg({ mozjpeg: true })
    .toBuffer();

  return compositedImageBuffer.toString("base64");
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  if (!req.body?.config) {
    res.status(400).json({ error: "Missing payload data" });
    return;
  }

  try {
    let base64Image;

    if (!req.body.config) {
      throw new Error("Missing config");
    }
    console.log(req.body.config.style);
    switch (req.body.config.style) {
      case "fantasy":
        base64Image = await buildFantasyImage(req.body.config);
        break;
      default:
        throw new Error("Invalid style");
    }

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(base64Image);
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
