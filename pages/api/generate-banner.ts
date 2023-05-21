import fs from "fs";
import path from "path";
import axios from "axios";
import sharp from "sharp";
import { buildFantasyImage } from "../../utils/banners/fantasy";
import { buildGalleryImage } from "../../utils/banners/gallery";
import type { NextApiRequest, NextApiResponse } from "next";
import { BannerStyle } from "../../context/BannerContext";

type ResponseData = { error: string } | string;

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
      case BannerStyle.Gallery:
        base64Image = await buildGalleryImage(req.body.config);
        break;
      case BannerStyle.Fantasy:
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
