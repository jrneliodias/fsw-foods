import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface PromoBannerProps {
  src: string | StaticImport;
  alt: string;
}
const PromoBanner = ({ src, alt }: PromoBannerProps) => {
  return (
    <Image
      src={src}
      width={0}
      height={0}
      alt={alt}
      sizes="100%"
      className="h-auto w-full"
    />
  );
};

export default PromoBanner;
