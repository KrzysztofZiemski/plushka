import React, { forwardRef, HTMLAttributes, InputHTMLAttributes } from "react";
import styles from "./styles.module.css";

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
  inputProps?: HTMLAttributes<HTMLTextAreaElement>;
  label: string;
  error?: string;
}

const TextArea = forwardRef(
  (
    { className, style, label, inputProps, error, ...props }: Props,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => (
    <label
      className={`${styles.input} ${error ? styles.error : ""} ${className}`}
      style={style}
    >
      <textarea ref={ref} {...props} {...inputProps} />
      <span>{label}</span>
      {error && <div className="text-error text-sm">{error}</div>}
    </label>
  )
);

TextArea.displayName = "TextArea";

export default TextArea;
