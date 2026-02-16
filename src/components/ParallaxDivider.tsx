import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxDividerProps {
  image: string;
  alt?: string;
  height?: string;
}

const ParallaxDivider = ({ image, alt = "Divider image", height = "h-[50vh]" }: ParallaxDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`relative ${height} overflow-hidden`}>
      <motion.div className="absolute inset-0" style={{ y }}>
        <img
          src={image}
          alt={alt}
          className="w-full h-[130%] object-cover"
          loading="lazy"
        />
      </motion.div>
      <div className="absolute inset-0 bg-background/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
    </div>
  );
};

export default ParallaxDivider;
