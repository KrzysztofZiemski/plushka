import { HTMLAttributes } from "react";
import { LoadingIcon } from "../../../assets/icons";

export default function Loader({
  className,
  ...props
}: HTMLAttributes<HTMLOrSVGElement>) {
  return <LoadingIcon className={`w-12 h-12 ${className}`} {...props} />;
}
