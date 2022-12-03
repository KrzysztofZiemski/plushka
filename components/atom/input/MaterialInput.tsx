import React from "react";
import styles from "./styles.module.css";

export default function MaterialInput() {
  return (
    <label className={styles.input}>
      <input placeholder=" " />
      <span>Textfield</span>
    </label>
  );
}
