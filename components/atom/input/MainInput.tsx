import { InputHTMLAttributes, ReactNode } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  AdormentEnd?: ReactNode;
  inputClassName?: string;
}
export default function MainInput({
  className,
  AdormentEnd,
  inputClassName,
  ...props
}: Props) {
  return (
    <div className={`relative  ${className || ""}`}>
      <input
        className={`h-9 w-full rounded-3xl border-2 border-primary hover:border-primary md:h-11 md:rounded-2xl  md:border-grey ${
          AdormentEnd ? "pl-3 pr-8" : "px-3"
        } outline-0 leading-9 text-base ${inputClassName || ""}`}
        {...props}
      />
      <div className="absolute inset-y-0 right-0 flex items-center justify-center w-8 pr-2">
        {AdormentEnd}
      </div>
    </div>
  );
}
