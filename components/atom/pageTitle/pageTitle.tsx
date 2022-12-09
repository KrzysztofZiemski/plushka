import React, { ReactNode } from "react";
import Decoration from "../../../assets/decoration-header.svg";
import styles from "./pageTitle.module.css";

export default function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1
      className={`${styles.pageTitle} flex items-center mb-3 p-4 relative text-3xl md:pl-2`}
    >
      {children}
    </h1>
  );
}
