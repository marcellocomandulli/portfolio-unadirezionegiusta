import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import { useLang } from "@/i18n/LanguageContext";

const ProcessSection = () => {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const img1Y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [100, -40]);

  const services = [
    { title: t("processService1Title"), desc: t("processService1Desc") },
    { title: t("processService2Title"), desc: t("processService2Desc") },
    { title: t("processService3Title"), desc: t("processService3Desc") },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-16 grain"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
        <div>
          <motion.p
            className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          ></motion.p>
          <motion.h2
            className="font-serif text-3xl sm:text-4xl lg:text-6xl text-foreground mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t("processTitle1")}
          </motion.h2>

          {/* Intro */}
          <motion.p
            className="font-body text-base sm:text-lg text-foreground/90 leading-relaxed mb-6 whitespace-pre-line font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("processIntro")}
          </motion.p>

          {/* Growth */}
          <motion.p
            className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t("processGrowth")}
          </motion.p>

          {/* Experience intro */}
          <motion.p
            className="font-body text-base sm:text-lg text-foreground/90 leading-relaxed mb-4 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {t("processExperience")}
          </motion.p>

          {/* Services */}
          <motion.div
            className="space-y-4 mb-8 pl-4 border-l-2 border-primary/30"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {services.map((s, i) => (
              <div key={i}>
                <span className="font-serif text-lg sm:text-xl text-foreground">
                  {s.title}
                </span>
                <span className="font-body text-base text-muted-foreground">
                  {s.desc}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Strength */}
          <motion.p
            className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            {t("processStrength")}
          </motion.p>

          {/* Closing */}
          <motion.p
            className="font-serif text-xl sm:text-2xl text-foreground/90 italic leading-relaxed whitespace-pre-line"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {t("processClosing")}
          </motion.p>
        </div>

        <div className="relative lg:sticky lg:top-32 lg:self-start min-h-[400px] sm:min-h-[600px] lg:min-h-[700px]">
          <motion.div
            className="relative z-10 w-[70%] lg:w-[65%] overflow-hidden shadow-2xl"
            style={{ y: img1Y }}
          >
            <img
              src={gallery4}
              alt="Process"
              className="w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
          <motion.div
            className="absolute top-[30%] right-0 w-[65%] lg:w-[60%] overflow-hidden shadow-2xl"
            style={{ y: img2Y }}
          >
            <img
              src={gallery7}
              alt="Process"
              className="w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </div>
      {/* Bottom feature cards */}
      <div className="max-w-7xl mx-auto mt-12 sm:mt-16">
        <div className="bg-foreground/4 dark:bg-foreground/6 rounded-2xl px-4 py-8 sm:py-12">
          <div className="mx-auto max-w-6xl px-2">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
              {/* Card 1 */}
              <div className="flex-1 bg-background/0 rounded-lg p-6 flex flex-col items-center text-center gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
                    />
                    <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
                  </svg>
                </div>
                <h4 className="font-serif text-lg sm:text-xl text-foreground font-semibold">
                  Progetti in più paesi
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  Collaborazioni in Italia e all'estero
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex-1 bg-background/0 rounded-lg p-6 flex flex-col items-center text-center gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"
                    />
                    <circle cx="12" cy="13" r="3" strokeWidth="1.5" />
                  </svg>
                </div>
                <h4 className="font-serif text-lg sm:text-xl text-foreground font-semibold">
                  8000+
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  follower nella nostra pagina di viaggio
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex-1 bg-background/0 rounded-lg p-6 flex flex-col items-center text-center gap-3 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4z"
                    />
                    <rect
                      x="3"
                      y="6"
                      width="12"
                      height="12"
                      rx="2"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <h4 className="font-serif text-lg sm:text-xl text-foreground font-semibold">
                  Foto • Video • Drone
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  Produzioni visive complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
