import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery8 from "@/assets/gallery-8.jpg";

const stories = [
  { img: gallery1, title: "Whispers of Dawn", location: "Alps, Switzerland", year: "2024" },
  { img: gallery3, title: "Neon Solitude", location: "Tokyo, Japan", year: "2023" },
  { img: gallery5, title: "Edge of the World", location: "Azores, Portugal", year: "2024" },
  { img: gallery8, title: "Infinite Sands", location: "Sahara, Morocco", year: "2023" },
];

const FeaturedStories = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-45%"]);

  return (
    <section id="stories" ref={containerRef} className="py-32 overflow-hidden grain">
      <div className="px-6 lg:px-16 mb-16">
        <motion.p
          className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Featured Work
        </motion.p>
        <motion.h2
          className="font-serif text-4xl lg:text-6xl text-foreground"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Stories
        </motion.h2>
      </div>

      <motion.div className="flex gap-8 pl-6 lg:pl-16" style={{ x }}>
        {stories.map((story, i) => (
          <motion.div
            key={story.title}
            className="relative flex-shrink-0 group cursor-pointer"
            style={{ width: i % 2 === 0 ? "55vw" : "40vw" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
          >
            <div className="relative overflow-hidden aspect-[3/2]">
              <img
                src={story.img}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/30 transition-colors duration-500" />
            </div>
            <div className="mt-5 flex items-baseline justify-between">
              <div>
                <h3 className="font-serif text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {story.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground mt-1">{story.location}</p>
              </div>
              <span className="font-sans-display text-xs text-muted-foreground tracking-wider">{story.year}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturedStories;
