export type DataResponse = Array<ResponseItem>;
import type { BannerStyle } from "../../context/BannerContext";

export interface ResponseItem extends Item {
  collection: {
    name: string;
    // Plus much more we don't need
  };
}

export interface Item {
  tokenId: string;
  image: string;
}

export interface Collection {
  name: string;
  items: Item[];
}

export interface GridProps {
  items: Item[];
  handleSelect(newItem: any): void;
  selected: Item[];
  collectionName: string;
}

export interface SelectCollectionProps {
  handleChange(value: string | null): void;
  collections: Collection[];
}

export interface BannerModalProps {
  bannerBase64: string;
  handleClose(): void;
  isOpen: boolean;
}

export interface StepperProps {
  currentStep: number;
  steps: number;
}

export interface ImageRadioButtonProps {
  image: string;
  selected: boolean;
  value: BannerStyle;
  handleChange(value: BannerStyle): void;
}
