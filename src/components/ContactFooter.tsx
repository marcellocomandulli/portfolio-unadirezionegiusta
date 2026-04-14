import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Instagram } from "lucide-react";
import logo from "@/assets/logo.png";
import sideImage from "@/assets/gallery-2.jpg";

const ContactFooter = () => {
  const { t } = useLang();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch("https://formspree.io/f/mbdznwwe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        toast({ title: t("formSuccess") });
        setForm({ name: "", email: "", message: "" });
      } else {
        // Se Formspree risponde con un errore (es. quota superata)
        toast({
          title: "Errore",
          description: "C'è stato un problema. Riprova più tardi.",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Errore di rete
      toast({
        title: "Errore di connessione",
        description: "Controlla la tua rete e riprova.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <footer
      id="contact"
      className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-16 grain"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-card to-background" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.p
          className="font-sans-display text-xs tracking-[0.4em] uppercase text-primary mb-4 sm:mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {t("contactLabel")}
        </motion.p>
        <motion.h2
          className="font-serif text-3xl sm:text-5xl lg:text-8xl text-foreground mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {t("contactTitle1")}{" "}
          <span className="text-gold-gradient">{t("contactTitle2")}</span>
        </motion.h2>
        <motion.p
          className="font-body text-base sm:text-xl text-foreground mb-8 sm:mb-12 max-w-lg mx-auto px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          {t("contactDesc")}
        </motion.p>

        {/* Contact: image left, form right */}
        <motion.div
          className="max-w-4xl mx-auto flex flex-col md:flex-row items-stretch gap-6 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.div
            className="hidden sm:block w-full md:w-1/2 flex-shrink-0 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <img
              src={sideImage}
              alt="Contact"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.form
            action="https://formspree.io/f/mbdznwwe"
            method="POST"
            onSubmit={handleSubmit}
            className="w-full md:w-1/2 text-left space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <label className="font-sans-display text-sm tracking-[0.15em] uppercase text-foreground mb-1.5 block">
                {t("formName")}
              </label>
              <Input
                name="name"
                required
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={t("formNamePlaceholder")}
                className="bg-background/50 border-border focus:border-primary rounded-none text-white placeholder:text-white/60 text-base"
              />
            </div>
            <div>
              <label className="font-sans-display text-sm tracking-[0.15em] uppercase text-foreground mb-1.5 block">
                {t("formEmail")}
              </label>
              <Input
                name="email"
                required
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={t("formEmailPlaceholder")}
                className="bg-background/50 border-border focus:border-primary rounded-none text-white placeholder:text-white/60 text-base"
              />
            </div>
            <div>
              <label className="font-sans-display text-sm tracking-[0.15em] uppercase text-foreground mb-1.5 block">
                {t("formMessage")}
              </label>
              <Textarea
                name="message"
                required
                maxLength={1000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder={t("formMessagePlaceholder")}
                className="bg-background/50 border-border focus:border-primary min-h-[120px] rounded-none text-white placeholder:text-white/60 text-base"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full font-sans-display text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase border-2 border-primary text-primary px-6 sm:px-10 py-3 sm:py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 rounded-none"
            >
              {sending ? "..." : t("formSend")}
            </button>
          </motion.form>
        </motion.div>

        <div className="mt-16 sm:mt-24 pt-6 sm:pt-8 border-t border-border flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 font-serif text-foreground tracking-widest text-sm">
            <img
              src={logo}
              alt="Una Direzione Giusta"
              className="brightness-0 invert h-6"
            />
            <div className="leading-[0.95]">
              <div>UNA DIREZIONE GIUSTA</div>
              <small className="text-xs opacity-90">{t("siteSubtitle")}</small>
            </div>
          </div>
          <a
            href="https://www.instagram.com/unadirezione_giusta/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={22} />
          </a>
          <span className="font-sans-display text-xs text-muted-foreground">
            {t("contactRights")} • {t("footerBrand")}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
