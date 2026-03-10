interface ParallaxDividerProps {
  image: string;
  alt?: string;
  height?: string;
}

const ParallaxDivider = ({ image, alt = "Divider image", height = "h-[60vh]" }: ParallaxDividerProps) => {
  return (
    <div className={`relative ${height}`} style={{ zIndex: 1, clipPath: "inset(0)" }}>
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>
    </div>
  );
};

export default ParallaxDivider;
