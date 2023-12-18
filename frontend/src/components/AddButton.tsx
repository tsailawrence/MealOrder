import React from "react";
import { AddButtonProps } from "@/lib/types/db";

const AddButton = ({ url }: AddButtonProps) => {
  return (
    <a
      href={url}
      className="text-decoration-none d-flex align-items-center justify-content-center"
    >
      <div className="text-black border border-5 border-black p-5 flex justify-center items-center rounded-lg">
        <b className="text-9xl">+</b>
        <div className="text-red-600 text-center text-base font-semibold leading-6 self-stretch whitespace-nowrap mt-6 mb-14 max-md:mb-10">
          Add new dish
        </div>
      </div>
    </a>
  );
};

export default AddButton;
