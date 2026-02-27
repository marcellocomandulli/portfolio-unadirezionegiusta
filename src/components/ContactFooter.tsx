import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";

const ContactFooter = () => {
  const { t } = useLang();
  return (
    <footer id="contact" className="relative py-32 px-6 lg:px-16 grain">
      <div className="absolute inset-0 bg-gradient-to-t from-card to-background" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-6"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {t("contactLabel")}
        </motion.p>
        <motion.h2 className="font-serif text-5xl lg:text-8xl text-foreground mb-8"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {t("contactTitle1")} <span className="text-gold-gradient">{t("contactTitle2")}</span>
        </motion.h2>
        <motion.p className="font-body text-xl text-muted-foreground mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          {t("contactDesc")}
        </motion.p>
        <motion.a href="mailto:hello@elaravoss.com"
          className="inline-block font-sans-display text-sm tracking-[0.3em] uppercase border-2 border-primary text-primary px-10 py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.5 }}>
          hello@elaravoss.com
        </motion.a>

        <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-serif text-foreground tracking-widest text-sm">ELARA<span className="text-primary">.</span></span>
          <div className="flex gap-8">
            {["Instagram", "Behance", "Vimeo"].map((s) => (
              <a key={s} href="#" className="font-sans-display text-xs text-muted-foreground hover:text-primary tracking-wider transition-colors duration-300">{s}</a>
            ))}
          </div>
          <span className="font-sans-display text-xs text-muted-foreground">{t("contactRights")}</span>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
