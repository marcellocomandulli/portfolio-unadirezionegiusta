import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getStorageUrl } from "@/lib/storage";

export type PhotoCategory = "matrimonio" | "shooting" | "evento" | "viaggio";

export interface PortfolioPhoto {
  name: string;
  url: string;
  category: PhotoCategory;
}

const getCategoryFromName = (name: string): PhotoCategory | null => {
  const lower = name.toLowerCase();
  if (lower.startsWith("matrimonio")) return "matrimonio";
  if (lower.startsWith("shooting")) return "shooting";
  if (lower.startsWith("evento")) return "evento";
  if (lower.startsWith("viaggio")) return "viaggio";
  return null;
};

export const usePortfolioPhotos = (filterCategory?: PhotoCategory) => {
  const [photos, setPhotos] = useState<PortfolioPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data, error } = await supabase.storage
        .from("foto")
        .list("", { limit: 500, sortBy: { column: "name", order: "asc" } });

      if (error || !data) {
        console.error("Error listing photos:", error);
        setLoading(false);
        return;
      }

      const mapped: PortfolioPhoto[] = data
        .filter((f) => {
          if (!f.name.match(/\.(jpe?g|png|webp)$/i)) return false;
          const cat = getCategoryFromName(f.name);
          if (!cat) return false;
          if (filterCategory && cat !== filterCategory) return false;
          return true;
        })
        .map((f) => ({
          name: f.name,
          url: getStorageUrl(f.name),
          category: getCategoryFromName(f.name)!,
        }));

      setPhotos(mapped);
      setLoading(false);
    };

    fetchPhotos();
  }, [filterCategory]);

  return { photos, loading };
};
