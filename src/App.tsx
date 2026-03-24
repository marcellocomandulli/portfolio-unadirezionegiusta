import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageContext";
import Index from "./pages/Index";
import Archive from "./pages/Archive";
import ArchiveCategory from "./pages/ArchiveCategory";
import NotFound from "./pages/NotFound";
import WhatsAppFloating from "./components/WhatsAppFloating";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        {/* WhatsApp floating: replace phone with your number in international format without + */}
        <WhatsAppFloating
          phone="393290653985"
          message="Ciao! Vorrei avere alcune informazioni su shooting e video."
        />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/archive/:category" element={<ArchiveCategory />} />
            <Route
              path="/archive/:category/:continent"
              element={<ArchiveCategory />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
