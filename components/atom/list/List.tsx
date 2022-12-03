import React, { HTMLAttributes } from "react";

export default function List(props: HTMLAttributes<HTMLUListElement>) {
  return <ul className="list-none p-0 m-0" {...props} />;
}
