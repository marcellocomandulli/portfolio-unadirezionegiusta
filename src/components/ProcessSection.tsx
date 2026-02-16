import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery7 from "@/assets/gallery-7.jpg";

const ProcessSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const img1Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [100, -40]);

  return (
    <section id="process" ref={ref} className="py-32 px-6 lg:px-16 grain">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Text column */}
        <div className="lg:sticky lg:top-32">
          <motion.p
            className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Philosophy
          </motion.p>
          <motion.h2
            className="font-serif text-4xl lg:text-6xl text-foreground mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Process &<br />Vision
          </motion.h2>
          <motion.blockquote
            className="font-serif text-2xl lg:text-3xl text-foreground/80 italic leading-relaxed mb-8 border-l-2 border-primary/30 pl-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            "Photography is not about the thing photographed. It is about how that thing looks photographed."
          </motion.blockquote>
          <motion.p
            className="font-body text-lg text-muted-foreground leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Every frame is an intentional conversation between light, shadow, and the fleeting
            human moment. I seek the spaces between—the exhale before the storm, the last
            golden ray before dusk claims the horizon.
          </motion.p>
          <motion.p
            className="font-body text-lg text-muted-foreground leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            My work is guided by patience and instinct in equal measure. Weeks of scouting
            distill into a single decisive moment—a gesture, a shadow, a convergence of
            elements that will never align again.
          </motion.p>
        </div>

        {/* Images column - overlapping */}
        <div className="relative min-h-[600px] lg:min-h-[800px]">
          <motion.div
            className="relative z-10 w-[70%] lg:w-[65%] overflow-hidden shadow-2xl"
            style={{ y: img1Y }}
          >
            <img src={gallery4} alt="Process" className="w-full object-cover" loading="lazy" />
          </motion.div>
          <motion.div
            className="absolute top-[30%] right-0 w-[65%] lg:w-[60%] overflow-hidden shadow-2xl"
            style={{ y: img2Y }}
          >
            <img src={gallery7} alt="Process" className="w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
