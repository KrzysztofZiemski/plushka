export const datoCMSImageLoader = ({ src, width, quality }: any) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

export const isClient = () => typeof window !== "undefined";
