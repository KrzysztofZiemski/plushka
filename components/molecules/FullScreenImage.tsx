import React from "react";
import Image from "next/image";
import { hygraphLoader } from "../../utils/next";
import CloseButton from "../atom/button/closeButton";
interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

export default function FullScreenImage({ src, alt, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-white z-10">
      <Image
        fill
        className="object-contain"
        alt={alt}
        src={src}
        loader={hygraphLoader}
      />
      <CloseButton className="fixed right-5 top-5" onClick={onClose} />
    </div>
  );
}
