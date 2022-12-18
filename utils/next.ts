export const hygraphLoader = ({ src, width }: any) => {
  const relativeSrc = (src: any) => src.split("/").pop();
  return `https://media.graphassets.com/resize=width:${width}/${relativeSrc(
    src
  )}`;
};

export const isClient = () => typeof window !== "undefined";

export const isProduction = () => process.env.NODE_ENV === "production";
