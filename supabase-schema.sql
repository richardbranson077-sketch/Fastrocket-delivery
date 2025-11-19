-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only read their own data
DROP POLICY IF EXISTS "Users can read own data" ON users;
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Create policy: Service role can do everything (for NextAuth)
DROP POLICY IF EXISTS "Service role has full access" ON users;
CREATE POLICY "Service role has full access"
  ON users
  FOR ALL
  USING (true);

-- Create shipments table
CREATE TABLE IF NOT EXISTS shipments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tracking_number VARCHAR(50) UNIQUE NOT NULL,
  sender_name VARCHAR(255) NOT NULL,
  sender_address TEXT NOT NULL,
  sender_phone VARCHAR(50) NOT NULL,
  sender_email VARCHAR(255),
  sender_country VARCHAR(100),
  sender_zip VARCHAR(20),
  receiver_name VARCHAR(255) NOT NULL,
  receiver_address TEXT NOT NULL,
  receiver_phone VARCHAR(50) NOT NULL,
  receiver_email VARCHAR(255),
  receiver_country VARCHAR(100),
  receiver_zip VARCHAR(20),
  weight VARCHAR(50) NOT NULL,
  service_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'created',
  date_sent DATE NOT NULL,
  estimated_delivery DATE NOT NULL,
  contents TEXT,
  payment_mode VARCHAR(50),
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create shipment_events table
CREATE TABLE IF NOT EXISTS shipment_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shipments_tracking_number ON shipments(tracking_number);
CREATE INDEX IF NOT EXISTS idx_shipment_events_shipment_id ON shipment_events(shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipment_events_timestamp ON shipment_events(timestamp DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_events ENABLE ROW LEVEL SECURITY;

-- Create policies: Public can read shipments (for tracking)
DROP POLICY IF EXISTS "Anyone can read shipments" ON shipments;
CREATE POLICY "Anyone can read shipments"
  ON shipments
  FOR SELECT
  USING (true);

-- Create policy: Public can read events
DROP POLICY IF EXISTS "Anyone can read events" ON shipment_events;
CREATE POLICY "Anyone can read events"
  ON shipment_events
  FOR SELECT
  USING (true);

-- Create policy: Service role can do everything (for admin operations)
DROP POLICY IF EXISTS "Service role can manage shipments" ON shipments;
CREATE POLICY "Service role can manage shipments"
  ON shipments
  FOR ALL
  USING (true);

DROP POLICY IF EXISTS "Service role can manage events" ON shipment_events;
CREATE POLICY "Service role can manage events"
  ON shipment_events
  FOR ALL
  USING (true);
