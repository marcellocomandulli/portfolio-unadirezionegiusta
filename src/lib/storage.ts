const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

export const getStorageUrl = (path: string) =>
  `${SUPABASE_URL}/storage/v1/object/public/foto/${path}`;
