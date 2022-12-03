import React, { ButtonHTMLAttributes } from "react";
import styles from "./styles.module.css";

export default function TextButton({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${styles.textButton} ${className || ""}`} {...props} />
  );
}
