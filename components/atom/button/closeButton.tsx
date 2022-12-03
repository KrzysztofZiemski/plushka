import React, { HTMLAttributes } from "react";
import { CloseIcon } from "../../../assets/icons";
import TextButton from "./textButton";

export default function CloseButton(props: HTMLAttributes<HTMLButtonElement>) {
  return (
    <TextButton {...props}>
      <CloseIcon />
    </TextButton>
  );
}
