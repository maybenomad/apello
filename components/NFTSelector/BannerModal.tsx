import React from "react";
import Modal from "../Modal";
import Image from "next/image";

import type { BannerModalProps } from "./types";

export const BannerModal: React.FC<BannerModalProps> = ({
  bannerBase64,
  handleClose,
  isOpen,
}) => {
  if (!bannerBase64) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} title="" handleClose={handleClose}>
      <h2 className="text-center font-bold text-2xl mb-4">
        Your <span className="text-indigo-500">NFT</span> banner is ready!
      </h2>
      <Image
        src={bannerBase64}
        alt=""
        unoptimized
        width={1200}
        height={675}
        className="pointer-events-none max-w-3xl w-full mb-5"
      />
      <div className="flex justify-center">
        <a
          href={bannerBase64}
          download={`nft_banner_${Date.now()}.jpg`}
          className="max-w-[300px] w-full py-2 rounded center bg-indigo-600 text-lg font-medium text-center text-white transition duration-150 ease-in-out hover:bg-indigo-700"
        >
          Download Image
        </a>
      </div>
    </Modal>
  );
};
