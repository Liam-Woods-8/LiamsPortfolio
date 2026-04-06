/**
 * Placeholder content — swap `src` / `embedUrl` / local paths when real assets are ready.
 * Keep the same shape so sections stay drop-in editable.
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
  /** YouTube embed URL, Vimeo player URL, or MP4 URL */
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
    id: "ph-1",
    src: "https://picsum.photos/seed/woods-photo-1/900/720",
    alt: "Portfolio photograph 1",
    caption: "Study I",
  },
  {
    id: "ph-2",
    src: "https://picsum.photos/seed/woods-photo-2/720/900",
    alt: "Portfolio photograph 2",
    caption: "Study II",
  },
  {
    id: "ph-3",
    src: "https://picsum.photos/seed/woods-photo-3/840/660",
    alt: "Portfolio photograph 3",
  },
  {
    id: "ph-4",
    src: "https://picsum.photos/seed/woods-photo-4/780/780",
    alt: "Portfolio photograph 4",
    caption: "Archival print",
  },
  {
    id: "ph-5",
    src: "https://picsum.photos/seed/woods-photo-5/900/600",
    alt: "Portfolio photograph 5",
  },
  {
    id: "ph-6",
    src: "https://picsum.photos/seed/woods-photo-6/680/880",
    alt: "Portfolio photograph 6",
  },
];

export const videos: VideoItem[] = [
  {
    id: "vid-1",
    title: "Reel / motion study",
    thumb: "https://picsum.photos/seed/woods-vid-1/640/360",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "vid-2",
    title: "Editorial cut",
    thumb: "https://picsum.photos/seed/woods-vid-2/640/360",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "vid-3",
    title: "Skate club feature",
    thumb: "https://picsum.photos/seed/woods-vid-3/640/360",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export const posters: PosterItem[] = [
  {
    id: "po-1",
    src: "https://picsum.photos/seed/woods-poster-1/700/980",
    alt: "Poster 1",
    title: "Series A",
  },
  {
    id: "po-2",
    src: "https://picsum.photos/seed/woods-poster-2/700/980",
    alt: "Poster 2",
    title: "Series B",
  },
  {
    id: "po-3",
    src: "https://picsum.photos/seed/woods-poster-3/700/980",
    alt: "Poster 3",
  },
  {
    id: "po-4",
    src: "https://picsum.photos/seed/woods-poster-4/700/980",
    alt: "Poster 4",
    title: "Night edition",
  },
];
