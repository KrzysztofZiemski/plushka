import React, { HTMLAttributes } from "react";

export default function ListElement({
  className,
  ...props
}: HTMLAttributes<HTMLLIElement>) {
  return <li className={`px-2 py-2 m-0 ${className}`} {...props} />;
}
