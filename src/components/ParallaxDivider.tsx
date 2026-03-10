interface ParallaxDividerProps {
  image: string;
  alt?: string;
  height?: string;
}

const ParallaxDivider = ({ image, alt = "Divider image", height = "h-[60vh]" }: ParallaxDividerProps) => {
  return (
    <div className={`relative ${height}`} style={{ zIndex: 1, clipPath: "inset(0)" }}>
      <div className="fixed inset-0">
         <img
12:           src={image}
13:           alt={alt}
14:           className="w-full h-full object-cover"
15:           loading="lazy"
16:           decoding="async"
17:         />
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>
    </div>
  );
};

export default ParallaxDivider;
