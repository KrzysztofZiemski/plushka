import React, { HTMLAttributes } from "react";
import { CloseIcon } from "../../../assets/icons";
import TextButton from "./textButton";
import styles from "./styles.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  iconProps?: HTMLAttributes<HTMLOrSVGElement>;
  hoverWhite?: boolean;
}
export default function CloseButton({
  iconProps,
  hoverWhite = false,
  className,
  ...props
}: Props) {
  return (
    <TextButton
      className={`${styles.hoverWhite} ${className || ""}`}
      {...props}
    >
      <CloseIcon
        {...iconProps}
        className={`h-5 w-5  ${iconProps?.className || ""}`}
      />
    </TextButton>
  );
}
