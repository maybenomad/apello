import { BannerStyle, BannerType, Config } from "../../context/BannerContext";
import { buildDefaultImage } from "../../utils/banners/general/default";
import { buildGeneralPostersImage } from "../../utils/banners/general/posters";
import { buildApeclubImage } from "../../utils/banners/twitter/apeclub";
import { buildCoinflipImage } from "../../utils/banners/twitter/coinflip";
import { buildFantasyImage } from "../../utils/banners/twitter/fantasy";
import { buildGalleryImage } from "../../utils/banners/twitter/gallery";
import { buildGelottoImage } from "../../utils/banners/twitter/gelotto";
import { buildJungleImage } from "../../utils/banners/twitter/jungle";
import { buildPixelWizardsImage } from "../../utils/banners/twitter/pixelwizards";
import { buildPostersImage } from "../../utils/banners/twitter/posters";
import { buildStreetImage } from "../../utils/banners/twitter/street";
import type { NextApiRequest, NextApiResponse } from "next";

const getImage = async (config: Config) => {
  if (config.type === BannerType.TwitterHeader) {
    // ToDo: refactor this. It just supports 1 style and is too verbos
    switch (config.style) {
      case BannerStyle.Gallery:
        return await buildGalleryImage(config);
      case BannerStyle.Fantasy:
        return await buildFantasyImage(config);
      case BannerStyle.Street:
        return await buildStreetImage(config);
      case BannerStyle.Jungle:
        return await buildJungleImage(config);
      case BannerStyle.Coinflip:
        return await buildCoinflipImage(config);
      case BannerStyle.PixelWizards:
        return await buildPixelWizardsImage(config);
      case BannerStyle.Gelotto:
        return await buildGelottoImage(config);
      case BannerStyle.Apeclub:
        return await buildApeclubImage(config);
      case BannerStyle.Posters:
        return await buildPostersImage(config);
      default:
        throw new Error("Invalid style");
    }
  }

  if (
    config.type === BannerType.General ||
    config.type === BannerType.DiscordServer
  ) {
    switch (config.style) {
      case BannerStyle.Posters:
        return await buildGeneralPostersImage(config);
      default:
        return await buildDefaultImage(config);
    }
  }
};

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
    if (!req.body.config) {
      throw new Error("Missing config");
    }

    const base64Image = await getImage(req.body.config);

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(base64Image);
  } catch (error: unknown) {
    console.error("Error:", error instanceof Error ? error.message : error);
    res.status(500).json({ error: "Failed to generate image" });
  }
}
