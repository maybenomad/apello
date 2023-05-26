import { BannerStyle } from "../../context/BannerContext";
import { buildCoinflipImage } from "../../utils/banners/twitter/coinflip";
import { buildFantasyImage } from "../../utils/banners/twitter/fantasy";
import { buildGalleryImage } from "../../utils/banners/twitter/gallery";
import { buildGelottoImage } from "../../utils/banners/twitter/gelotto";
import { buildJungleImage } from "../../utils/banners/twitter/jungle";
import { buildPixelWizardsImage } from "../../utils/banners/twitter/pixelwizards";
import { buildStreetImage } from "../../utils/banners/twitter/street";
import type { NextApiRequest, NextApiResponse } from "next";

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
    let base64Image: string;

    if (!req.body.config) {
      throw new Error("Missing config");
    }

    switch (req.body.config.style) {
      case BannerStyle.Gallery:
        base64Image = await buildGalleryImage(req.body.config);
        break;
      case BannerStyle.Fantasy:
        base64Image = await buildFantasyImage(req.body.config);
        break;
      case BannerStyle.Street:
        base64Image = await buildStreetImage(req.body.config);
        break;
      case BannerStyle.Jungle:
        base64Image = await buildJungleImage(req.body.config);
        break;
      case BannerStyle.Coinflip:
        base64Image = await buildCoinflipImage(req.body.config);
        break;
      case BannerStyle.PixelWizards:
        base64Image = await buildPixelWizardsImage(req.body.config);
        break;
      case BannerStyle.Gelotto:
        base64Image = await buildGelottoImage(req.body.config);
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
