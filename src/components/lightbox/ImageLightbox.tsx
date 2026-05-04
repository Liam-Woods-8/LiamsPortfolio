"use client";

import { MediaLightbox } from "./MediaLightbox";

type ImageLightboxProps = {
  open: boolean;
  src: string | null;
  alt?: string;
  caption?: string;
  onClose: () => void;
  /** Posters: larger modal with offset / geometric backdrop */
  presentation?: "default" | "poster";
};

export function ImageLightbox({
  open,
  src,
  alt = "Image preview",
  caption,
  onClose,
  presentation = "default",
}: ImageLightboxProps) {
  return (
    <MediaLightbox
      variant="image"
      open={open}
      src={src}
      alt={alt}
      caption={caption}
      onClose={onClose}
      presentation={presentation}
    />
  );
}
