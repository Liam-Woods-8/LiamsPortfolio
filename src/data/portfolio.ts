/**
 * Placeholder content — swap `src` / `embedUrl` / local paths when real assets are ready.
 * Keep the same shape so sections stay drop-in editable.
 *
 * Naming: photos IMG_####, videos MP4_####, posters PDF_#### (print-ready poster files).
 */

export type PhotoItem = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

export type VideoItem = {
  id: string;
  title: string;
  thumb: string;
  /** YouTube / Vimeo embed URL, or a direct image/GIF path for in-modal playback */
  embedUrl: string;
};

export type PosterItem = {
  id: string;
  src: string;
  alt: string;
  title?: string;
};

export const photos: PhotoItem[] = [
  {
    id: "IMG_0001",
    src: "/images/snow1.JPG",
    alt: "IMG_0001",
    caption: "IMG_0001",
  },
  {
    id: "IMG_0002",
    src: "/images/snow2.JPG",
    alt: "IMG_0002",
    caption: "IMG_0002",
  },
  {
    id: "IMG_0003",
    src: "/images/snow3.JPG",
    alt: "IMG_0003",
    caption: "IMG_0003",
  },
  {
    id: "IMG_0004",
    src: "/images/loading.gif",
    alt: "IMG_0004",
    caption: "IMG_0004",
  },
];

export const videos: VideoItem[] = [
  {
    id: "MP4_0001",
    title: "MP4_0001",
    thumb: "/images/loading.gif",
    embedUrl: "/images/loading.gif",
  },
  {
    id: "MP4_0002",
    title: "MP4_0002",
    thumb: "/images/loading.gif",
    embedUrl: "/images/loading.gif",
  },
  {
    id: "MP4_0003",
    title: "MP4_0003",
    thumb: "/images/loading.gif",
    embedUrl: "/images/loading.gif",
  },
];

export const posters: PosterItem[] = [
  {
    id: "PDF_0001",
    src: "/images/PDF_0001.png",
    alt: "PDF_0001",
    title: "PDF_0001",
  },
  {
    id: "PDF_0002",
    src: "/images/thereAreNoMaps.png",
    alt: "PDF_0002",
    title: "PDF_0002",
  },
  {
    id: "PDF_0003",
    src: "/images/loading.gif",
    alt: "PDF_0003",
    title: "PDF_0003",
  },
  {
    id: "PDF_0004",
    src: "/images/loading.gif",
    alt: "PDF_0004",
    title: "PDF_0004",
  },
];
