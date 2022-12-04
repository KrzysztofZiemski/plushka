import React, { HTMLAttributes, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./styles.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  text: string;
}
export default function Markdown({ text, className, ...props }: Props) {
  return (
    <ReactMarkdown
      className={`${styles.root} ${className}`}
      remarkPlugins={[remarkGfm]}
      {...props}
    >
      {text}
    </ReactMarkdown>
  );
}
