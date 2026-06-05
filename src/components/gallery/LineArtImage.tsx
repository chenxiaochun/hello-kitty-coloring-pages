type LineArtImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function LineArtImage({
  src,
  alt,
  className = "",
  priority = false,
}: LineArtImageProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- local SVG/PNG line art from /public
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={`h-full w-full object-contain ${className}`}
    />
  );
}
