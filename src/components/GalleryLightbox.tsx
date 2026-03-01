import { useState, useCallback } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface LightboxImage {
  src: string;
  alt?: string;
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

  const slides = images.map((img) => ({ src: img.src, alt: img.alt }));

  return (
    <>
      {children(openAtIndex)}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{
          container: { backgroundColor: "hsl(var(--background) / 0.95)" },
        }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
};

export default GalleryLightbox;
