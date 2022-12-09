import { HTMLAttributes, useRef, useState, useEffect } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
}

export default function Accordion({ isOpen, className, ...props }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    if (!isOpen) {
      const height = ref.current.scrollHeight;
      setHeight(height);
      ref.current.style.maxHeight = `${height}px`;
      setTimeout(() => {
        if (!ref.current) return;
        ref.current.style.maxHeight = "0";
      }, 100);
    } else {
      ref.current.style.maxHeight = `${height}px`;
      setTimeout(() => {
        if (!ref.current) return;
        ref.current.style.maxHeight = "none";
      }, 100);
    }
  }, [height, isOpen]);

  return (
    <div
      {...props}
      ref={ref}
      className={`transition-all ease-linear overflow-hidden ${className}`}
      onTransitionEnd={() => {
        if (isOpen && ref.current) ref.current.style.maxHeight = "none";
      }}
    />
  );
}
