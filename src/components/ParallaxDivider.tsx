interface ParallaxDividerProps {
  image: string;
  alt?: string;
  height?: string;
}

const ParallaxDivider = ({ image, alt = "Divider image", height = "h-[60vh]" }: ParallaxDividerProps) => {
  return (
    <div className={`relative ${height} -z-0`}>
      <div className={`sticky top-0 ${height} overflow-hidden`}>
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>
    </div>
  );
};

export default ParallaxDivider;
