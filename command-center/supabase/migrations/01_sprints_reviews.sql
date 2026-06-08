-- Create Sprints Table
CREATE TABLE IF NOT EXISTS sprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  pillar TEXT NOT NULL,
  color TEXT NOT NULL,
  metric_name TEXT NOT NULL,
  baseline_value NUMERIC NOT NULL,
  target_value NUMERIC NOT NULL,
  current_value NUMERIC NOT NULL DEFAULT 0,
  start_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  end_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- 'active', 'success', 'failure'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for sprints
ALTER TABLE sprints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own sprints"
  ON sprints
  FOR ALL
  USING (auth.uid() = user_id);

-- Create Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  month_name TEXT NOT NULL,
  score NUMERIC NOT NULL,
  focus_area TEXT NOT NULL,
  color TEXT NOT NULL,
  reflections TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own reviews"
  ON reviews
  FOR ALL
  USING (auth.uid() = user_id);

-- Create simple trigger to update `updated_at` (if not exists)
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_sprints_modtime
BEFORE UPDATE ON sprints
FOR EACH ROW EXECUTE FUNCTION update_modified_column();

CREATE TRIGGER update_reviews_modtime
BEFORE UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_modified_column();
