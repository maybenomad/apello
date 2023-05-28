import React from "react";
import { SelectCollectionProps } from "./types";

export const SelectCollection: React.FC<SelectCollectionProps> = ({
  collections = [],
  handleChange,
}) => {
  return (
    <select
      className=" border text-md rounded-lg block w-full p-2.5 bg-gray-700 border-gray-500  text-white max-w-md"
      defaultValue="DEFAULT"
      disabled={!collections?.length}
      onChange={(event) => {
        handleChange(event.target.value ?? null);
      }}
    >
      <option value="DEFAULT" disabled>
        Choose a collection
      </option>
      {collections.map(({ name }) => (
        <option key={name} value={name}>
          {name}
        </option>
      ))}
    </select>
  );
};
