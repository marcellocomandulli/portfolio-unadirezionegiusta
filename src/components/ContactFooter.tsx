import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const ContactFooter = () => {
  const { t } = useLang();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate send — replace with real endpoint when backend is connected
    setTimeout(() => {
      toast({ title: t("formSuccess") });
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <footer id="contact" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-16 grain">
      <div className="absolute inset-0 bg-gradient-to-t from-card to-background" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-4 sm:mb-6"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          {t("contactLabel")}
        </motion.p>
        <motion.h2 className="font-serif text-3xl sm:text-5xl lg:text-8xl text-foreground mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          {t("contactTitle1")} <span className="text-gold-gradient">{t("contactTitle2")}</span>
        </motion.h2>
        <motion.p className="font-body text-base sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-lg mx-auto px-4"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          {t("contactDesc")}
        </motion.p>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto text-left space-y-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <div>
            <label className="font-sans-display text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">
              {t("formName")}
            </label>
            <Input
              required
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t("formNamePlaceholder")}
              className="bg-background/50 border-border focus:border-primary"
            />
          </div>
          <div>
            <label className="font-sans-display text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">
              {t("formEmail")}
            </label>
            <Input
              required
              type="email"
              maxLength={255}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder={t("formEmailPlaceholder")}
              className="bg-background/50 border-border focus:border-primary"
            />
          </div>
          <div>
            <label className="font-sans-display text-xs tracking-[0.15em] uppercase text-muted-foreground mb-1.5 block">
              {t("formMessage")}
            </label>
            <Textarea
              required
              maxLength={1000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={t("formMessagePlaceholder")}
              className="bg-background/50 border-border focus:border-primary min-h-[120px]"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="w-full font-sans-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase border-2 border-primary text-primary px-6 sm:px-10 py-3 sm:py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50"
          >
            {sending ? "..." : t("formSend")}
          </button>
        </motion.form>

        <div className="mt-16 sm:mt-24 pt-6 sm:pt-8 border-t border-border flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <span className="font-serif text-foreground tracking-widest text-sm">ELARA<span className="text-primary">.</span></span>
          <div className="flex gap-6 sm:gap-8">
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
