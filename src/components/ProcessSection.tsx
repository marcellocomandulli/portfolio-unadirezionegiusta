import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { getStorageUrl } from "@/lib/storage";
import { useLang } from "@/i18n/LanguageContext";

const ProcessSection = () => {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  const about1 = getStorageUrl("about-1.jpg");
  const about2 = getStorageUrl("about-2.jpg");

  const Counter = ({ target }: { target: number }) => {
    const el = useRef<HTMLSpanElement | null>(null);
    const inView = useInView(el, { once: true });
    const [value, setValue] = useState(0);

    useEffect(() => {
      if (!inView) return;
      let start: number | null = null;
      const duration = 800;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        setValue(current);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, [inView, target]);

    return (
      <span ref={el} className="font-serif text-xl sm:text-2xl text-foreground font-semibold">
        {value >= target ? `${target}+` : `${value}+`}
      </span>
    );
  };

  return (
    <section id="about" ref={ref} className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-16 grain">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-start">
        <div>
          <motion.p
            className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {t("processTitle1") === "Chi Siamo" ? "About Us" : ""}
          </motion.p>
          <motion.h2
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground mb-10 sm:mb-14 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {t("processTitle1")}
          </motion.h2>
          <motion.p
            className="font-body text-xl sm:text-2xl text-foreground/90 leading-relaxed mb-6 whitespace-pre-line font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("processIntro")}
          </motion.p>
          <motion.p
            className="font-body text-xl sm:text-2xl text-muted-foreground leading-relaxed mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {t("processGrowth")}
          </motion.p>
          <motion.p
            className="font-serif text-2xl sm:text-3xl text-foreground/90 italic leading-relaxed whitespace-pre-line"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {t("processClosing")}
          </motion.p>
        </div>
        <div className="relative lg:self-start min-h-[400px] sm:min-h-[600px] lg:min-h-[700px]">
          <div className="relative z-10 w-full sm:w-[70%] lg:w-[65%] overflow-hidden shadow-2xl translate-y-0 lg:-translate-y-6">
            <img src={about1} alt="Process" className="w-full object-cover" loading="lazy" decoding="async" />
          </div>
          <div className="relative mt-6 lg:mt-0 lg:absolute lg:top-[30%] lg:right-0 w-full sm:w-[65%] lg:w-[60%] overflow-hidden shadow-2xl lg:-translate-y-12">
            <img src={about2} alt="Process" className="w-full object-cover" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 sm:mt-16">
        <div className="bg-foreground/4 dark:bg-foreground/6 rounded-2xl px-4 py-8 sm:py-12">
          <div className="mx-auto max-w-6xl px-2">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-stretch">
              <div className="flex-1 bg-background/0 border border-border p-7 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-9 h-9" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M8 3v4" />
                  </svg>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-foreground font-semibold">{t("processCard1Title")}</h4>
                <p className="font-body text-lg sm:text-xl text-muted-foreground">{t("processCard1Desc")}</p>
              </div>
              <div className="flex-1 bg-background/0 border border-border p-7 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-9 h-9" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M17 20h5v-2a4 4 0 0 0-4-4h-1" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 20H4v-2a4 4 0 0 1 4-4h1" />
                    <circle cx="12" cy="7" r="3" strokeWidth="1.6" />
                  </svg>
                </div>
                <Counter target={8000} />
                <p className="font-body text-lg sm:text-xl text-muted-foreground">{t("processCard2Desc")}</p>
              </div>
              <div className="flex-1 bg-background/0 border border-border p-7 flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 flex items-center justify-center bg-primary/10 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-9 h-9" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4z" />
                    <rect x="3" y="6" width="12" height="12" rx="2" strokeWidth="1.6" />
                  </svg>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-foreground font-semibold">{t("processCard3Title")}</h4>
                <p className="font-body text-lg sm:text-xl text-muted-foreground">{t("processCard3Desc")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
