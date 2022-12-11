import React, { HTMLAttributes } from "react";
import { HeartIcon } from "../../../assets/icons";
import TextButton from "../button/textButton";
import styles from "./favourite.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  count?: number;
  iconProps?: HTMLAttributes<HTMLOrSVGImageElement>;
  filled?: boolean;
}
export default function FavouriteButton({
  className,
  count,
  iconProps,
  filled = false,
  ...props
}: Props) {
  return (
    <TextButton className={`relative p-3 ${className}`} {...props}>
      {!!count && (
        <div
          className={`${
            filled ? "border-2 border-white" : ""
          } absolute flex items-center justify-center bg-primary w-6 h-6 bottom-3 right-1 rounded-full bottom- text-white font-bold text-sm`}
        >
          {count}
        </div>
      )}
      <HeartIcon
        {...iconProps}
        className={`${
          filled
            ? `${
                count ? styles.stroke : styles.svg
              }  fill-primary stroke-transparent`
            : ""
        } ${iconProps?.className}`}
      />
    </TextButton>
  );
}
