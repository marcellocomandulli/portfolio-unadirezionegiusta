import { useState, useCallback } from "react";
import Lightbox, { type Slide } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export interface LightboxImage {
  src: string;
  alt?: string;
  title?: string;
  exif?: { aperture: string; shutter: string; iso: string };
}

interface GalleryLightboxProps {
  images: LightboxImage[];
  children: (openAtIndex: (index: number) => void) => React.ReactNode;
}

const GalleryLightbox = ({ images, children }: GalleryLightboxProps) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAtIndex = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  const slides: Slide[] = images.map((img) => ({ src: img.src, alt: img.alt }));
  const current = images[index];

  return (
    <>
      {children(openAtIndex)}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        on={{ view: ({ index: i }) => setIndex(i) }}
        slides={slides}
        styles={{
          container: { backgroundColor: "hsl(var(--background) / 0.95)" },
        }}
        controller={{ closeOnBackdropClick: true }}
        render={{
          slideFooter: () =>
            current ? (
              <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-6 pointer-events-none">
                {current.title && (
                  <h4 className="font-serif text-base sm:text-xl text-foreground mb-2">{current.title}</h4>
                )}
                {current.exif && (
                  <div className="flex gap-4 font-sans-display text-xs sm:text-sm text-primary tracking-wider">
                    <span>{current.exif.aperture}</span>
                    <span>{current.exif.shutter}</span>
                    <span>{current.exif.iso}</span>
                  </div>
                )}
              </div>
            ) : null,
        }}
      />
    </>
  );
};

export default GalleryLightbox;
