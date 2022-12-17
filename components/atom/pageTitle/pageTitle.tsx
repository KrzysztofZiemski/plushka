import React, { HTMLAttributes, ReactNode } from "react";
import Decoration from "../../../assets/decoration-header.svg";
import styles from "./pageTitle.module.css";

interface Props extends HTMLAttributes<HTMLHeadElement> {}
export default function PageTitle({ children, className, ...props }: Props) {
  return (
    <h1
      className={`${
        styles.pageTitle
      } flex items-center mb-3 p-4 relative text-3xl md:pl-2 ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </h1>
  );
}
