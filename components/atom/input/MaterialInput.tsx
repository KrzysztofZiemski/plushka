import error from "next/error";
import React, { forwardRef, HTMLAttributes, InputHTMLAttributes } from "react";
import style from "styled-jsx/style";
import styles from "./styles.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  inputProps?: HTMLAttributes<HTMLInputElement>;
  label: string;
  error?: string;
}

const MaterialInput = forwardRef(
  (
    { className, style, label, inputProps, error, ...props }: Props,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => (
    <label
      className={`${styles.input} ${error ? styles.error : ""} ${
        className || ""
      }`}
      style={style}
    >
      <input ref={ref} {...props} {...inputProps} />
      <span>{label}</span>
      {error && <div className="text-red-400 text-sm">{error}</div>}
    </label>
  )
);
MaterialInput.displayName = "MaterialInput";

export default MaterialInput;
