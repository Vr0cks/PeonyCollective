-- Add delivered_at column to orders table to track the 3-day approval window starting time
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS delivered_at TIMESTAMP WITH TIME ZONE;
