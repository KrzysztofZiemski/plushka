import React, { HTMLAttributes } from "react";
import { LoadingIcon } from "../../../assets/icons";
import styles from "./loader.module.css";

export default function Loader({
  className,
  ...props
}: HTMLAttributes<HTMLOrSVGElement>) {
  return <LoadingIcon className={`w-12 h-12 ${className}`} {...props} />;
}
