import React from "react";
import Image from "next/image";
import type { GridProps } from "./types";

export const Grid: React.FC<GridProps> = ({
  items,
  handleSelect,
  selected,
  collectionName,
}) => {
  return items ? (
    <div className="w-full h-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 justify-center items-center mt-12 mb-6 max-w-7xl">
      {items.map((item) => {
        const { tokenId, image } = item;
        const isSelected = Boolean(selected.includes(item));
        return (
          <div
            key={tokenId}
            className={`cursor-pointer relative w-full pb-full object-cover rounded-md overflow-hidden self-center justify-self-center bg-gray-800 outline outline-4 outline-offset-2 ${
              isSelected ? "outline-pink-500" : " outline-transparent"
            }`}
          >
            <div className="w-full h-full absolute bg-gray-700 animate-pulse flex justify-center items-center">
              <svg
                className="w-12 h-12 text-gray-200"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"></path>
              </svg>
            </div>
            <Image
              fill
              src={image}
              alt={`${collectionName} ${tokenId}`}
              className="transition-transform duration-175 ease-out hover:scale-105"
            />
            <div
              className="absolute w-full h-full flex justify-center items-center transition-opacity ease-out opacity-0 hover:opacity-100 hover:bg-slate-900/75"
              onClick={() => {
                handleSelect(item);
              }}
            >
              {isSelected ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm3 10.5a.75.75 0 000-1.5H9a.75.75 0 000 1.5h6z"
                    clip-rule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clip-rule="evenodd"
                  />
                </svg>
              )}
            </div>
            <div className="absolute pointer-events-none bottom-0 right-0 rounded-tl bg-black bg-opacity-75 text-white text-sm text-center py-1 px-2">
              #{tokenId}
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};
