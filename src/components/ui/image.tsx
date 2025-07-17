import NextImage, {
  ImageProps as NextImageProps,
  ImageLoader,
} from "next/image";
import imageKitLoader from "../../../lib/imageKitLoader";

export type ImageProps = Omit<NextImageProps, "loader">;

/**
 * Enhanced Image component with performance optimizations
 * - Automatically applies the ImageKit loader for optimized image delivery
 * - Sets default loading behavior based on image importance
 * - Sets appropriate sizes attribute for responsive images
 * - Uses ImageKit for automatic caching and optimization
 */
export function Image({ sizes, priority, loading, ...props }: ImageProps) {
  // Set default loading behavior: eager for priority images, lazy for others
  const loadingBehavior = priority ? "eager" : loading || "lazy";

  // Set default sizes if not provided for responsive images
  const defaultSizes =
    sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return (
    <NextImage
      {...props}
      loader={imageKitLoader as ImageLoader}
      loading={loadingBehavior}
      sizes={defaultSizes}
    />
  );
}
