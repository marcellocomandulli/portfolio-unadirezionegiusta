
-- Make the bucket public
UPDATE storage.buckets SET public = true WHERE id = 'foto';

-- Allow public read access to files in the bucket
CREATE POLICY "Public read access for foto bucket"
ON storage.objects
FOR SELECT
USING (bucket_id = 'foto');

-- Create portfolio_photos table
CREATE TABLE public.portfolio_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  file_path TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('matrimonio', 'shooting', 'evento')),
  title TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_photos ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view portfolio photos"
ON public.portfolio_photos
FOR SELECT
USING (true);
