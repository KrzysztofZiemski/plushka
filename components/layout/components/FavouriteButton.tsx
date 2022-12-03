import React, { HTMLAttributes } from "react";
import { HeartIcon } from "../../../assets/icons";
import TextButton from "../../atom/button/textButton";

export default function FavouriteButton({
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <TextButton className={`relative p-3 ${className}`} {...props}>
      <div className="absolute flex items-center justify-center bg-primary w-6 h-6 bottom-3 right-1 rounded-full bottom- text-white font-bold text-lg">
        -
      </div>
      <HeartIcon />
    </TextButton>
  );
}
