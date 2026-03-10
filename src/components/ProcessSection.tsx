import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import { useLang } from "@/i18n/LanguageContext";

const ProcessSection = () => {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const img1Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [100, -40]);

  const services = [
    { title: t("processService1Title"), desc: t("processService1Desc") },
    { title: t("processService2Title"), desc: t("processService2Desc") },
    { title: t("processService3Title"), desc: t("processService3Desc") },
  ];

  return (
    <section id="about" ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-16 grain">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
        <div>
          <motion.p className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-4"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            {t("processLabel")}
          </motion.p>
          <motion.h2 className="font-serif text-3xl sm:text-4xl lg:text-6xl text-foreground mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>
            {t("processTitle1")}<br />{t("processTitle2")}
          </motion.h2>

          {/* Intro */}
          <motion.p className="font-body text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 whitespace-pre-line font-medium"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            {t("processIntro")}
          </motion.p>

          {/* Growth */}
          <motion.p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-8"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            {t("processGrowth")}
          </motion.p>

          {/* Experience intro */}
          <motion.p className="font-body text-base sm:text-lg text-foreground/90 leading-relaxed mb-4 font-medium"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
            {t("processExperience")}
          </motion.p>

          {/* Services */}
          <motion.div className="space-y-4 mb-8 pl-4 border-l-2 border-primary/30"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
            {services.map((s, i) => (
              <div key={i}>
                <span className="font-serif text-lg sm:text-xl text-foreground">{s.title}</span>
                <span className="font-body text-base text-muted-foreground">: {s.desc}</span>
              </div>
            ))}
          </motion.div>

          {/* Strength */}
          <motion.p className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-6"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
            {t("processStrength")}
          </motion.p>

          {/* Closing */}
          <motion.p className="font-serif text-xl sm:text-2xl text-foreground/90 italic leading-relaxed whitespace-pre-line"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.7, duration: 0.8 }}>
            {t("processClosing")}
          </motion.p>
        </div>

        <div className="relative lg:sticky lg:top-32 lg:self-start min-h-[400px] sm:min-h-[600px] lg:min-h-[700px]">
          <motion.div className="relative z-10 w-[70%] lg:w-[65%] overflow-hidden shadow-2xl" style={{ y: img1Y }}>
            <img src={gallery4} alt="Process" className="w-full object-cover" loading="lazy" decoding="async" />
          </motion.div>
          <motion.div className="absolute top-[30%] right-0 w-[65%] lg:w-[60%] overflow-hidden shadow-2xl" style={{ y: img2Y }}>
            <img src={gallery7} alt="Process" className="w-full object-cover" loading="lazy" decoding="async" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
