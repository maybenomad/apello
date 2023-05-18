import React from "react";
import Image from "next/image";

export const ImageRadioButton = ({ handleChange, image, selected, value }) => {
  return (
    <label className=" cursor-pointer flex flex-col-reverse gap-2 items-center capitalize">
      {value}
      <input
        type="radio"
        value={value}
        checked={selected}
        onChange={() => handleChange(value)}
        className="sr-only"
      />
      <div
        className={`overflow-hidden object-cover rounded-md outline outline-4 outline-offset-2 ${
          selected ? "outline-pink-500" : " outline-transparent"
        }`}
      >
        <Image
          src={image}
          alt={`${value} style banner`}
          width={120}
          height={120}
        />
      </div>
    </label>
  );
};
