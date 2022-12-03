import React, { HTMLAttributes } from "react";
import { HeartIcon } from "../../../assets/icons";
import TextButton from "../button/textButton";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  text?: string;
}
export default function FavouriteButton({ className, text, ...props }: Props) {
  return (
    <TextButton className={`relative p-3 ${className}`} {...props}>
      {text && (
        <div className="absolute flex items-center justify-center bg-primary w-6 h-6 bottom-3 right-1 rounded-full bottom- text-white font-bold text-lg">
          {text}
        </div>
      )}
      <HeartIcon />
    </TextButton>
  );
}
