import Archive from "./Archive";
import { useParams } from "react-router-dom";
import type { ArchiveCategory, Continent } from "@/i18n/translations";

const ArchiveCategory = () => {
  const params = useParams();
  const category = params.category as ArchiveCategory | undefined;
  const continent = params.continent as Continent | undefined;

  return <Archive routeCategory={category} routeContinent={continent} />;
};

export default ArchiveCategory;
