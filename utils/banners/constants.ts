import { ResizeOptions } from "sharp";

// Sharp - resize options to help fit non-square images to square
export const RESIZE_OPTIONS: ResizeOptions = {
  fit: "contain",
  position: "center",
  background: { r: 0, g: 0, b: 0, alpha: 1 },
};
