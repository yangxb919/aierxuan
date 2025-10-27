-- Create RFQ (Request for Quote) table
CREATE TABLE IF NOT EXISTS rfqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Contact Information
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    phone VARCHAR(50),
    
    -- Request Details
    product_interest TEXT,
    message TEXT,
    quantity INTEGER,
    budget_range VARCHAR(100),
    
    -- Additional Information
    country VARCHAR(100),
    industry VARCHAR(100),
    urgency VARCHAR(50) DEFAULT 'normal', -- normal, urgent, flexible
    
    -- System Fields
    status VARCHAR(50) DEFAULT 'new', -- new, contacted, quoted, closed, spam
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high
    assigned_to UUID REFERENCES admin_users(id),
    
    -- Metadata
    source VARCHAR(100) DEFAULT 'website', -- website, email, phone, etc.
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    language_code VARCHAR(10) DEFAULT 'en',
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contacted_at TIMESTAMP WITH TIME ZONE,
    
    -- Notes and Follow-up
    admin_notes TEXT,
    follow_up_date DATE,
    
    -- Constraints
    CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_status CHECK (status IN ('new', 'contacted', 'quoted', 'closed', 'spam')),
    CONSTRAINT valid_priority CHECK (priority IN ('low', 'medium', 'high')),
    CONSTRAINT valid_urgency CHECK (urgency IN ('normal', 'urgent', 'flexible'))
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rfqs_status ON rfqs(status);
CREATE INDEX IF NOT EXISTS idx_rfqs_created_at ON rfqs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rfqs_email ON rfqs(email);
CREATE INDEX IF NOT EXISTS idx_rfqs_assigned_to ON rfqs(assigned_to);
CREATE INDEX IF NOT EXISTS idx_rfqs_priority ON rfqs(priority);
CREATE INDEX IF NOT EXISTS idx_rfqs_language_code ON rfqs(language_code);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_rfqs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_rfqs_updated_at
    BEFORE UPDATE ON rfqs
    FOR EACH ROW
    EXECUTE FUNCTION update_rfqs_updated_at();

-- Enable RLS (Row Level Security)
ALTER TABLE rfqs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow public to insert (for website form submissions)
CREATE POLICY "Allow public to insert RFQs" ON rfqs
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow authenticated users to view all RFQs
CREATE POLICY "Allow authenticated users to view RFQs" ON rfqs
    FOR SELECT TO authenticated
    USING (true);

-- Allow authenticated users to update RFQs
CREATE POLICY "Allow authenticated users to update RFQs" ON rfqs
    FOR UPDATE TO authenticated
    USING (true);

-- Allow service role full access
CREATE POLICY "Allow service role full access to RFQs" ON rfqs
    FOR ALL TO service_role
    USING (true);

-- Create RFQ status history table for audit trail
CREATE TABLE IF NOT EXISTS rfq_status_history (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    rfq_id UUID NOT NULL REFERENCES rfqs(id) ON DELETE CASCADE,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_by UUID REFERENCES admin_users(id),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT valid_old_status CHECK (old_status IN ('new', 'contacted', 'quoted', 'closed', 'spam')),
    CONSTRAINT valid_new_status CHECK (new_status IN ('new', 'contacted', 'quoted', 'closed', 'spam'))
);

-- Create index for RFQ status history
CREATE INDEX IF NOT EXISTS idx_rfq_status_history_rfq_id ON rfq_status_history(rfq_id);
CREATE INDEX IF NOT EXISTS idx_rfq_status_history_created_at ON rfq_status_history(created_at DESC);

-- Enable RLS for status history
ALTER TABLE rfq_status_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for status history
CREATE POLICY "Allow authenticated users to view RFQ status history" ON rfq_status_history
    FOR SELECT TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to insert RFQ status history" ON rfq_status_history
    FOR INSERT TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow service role full access to RFQ status history" ON rfq_status_history
    FOR ALL TO service_role
    USING (true);

-- Create function to automatically log status changes
CREATE OR REPLACE FUNCTION log_rfq_status_change()
RETURNS TRIGGER AS $$
BEGIN
    -- Only log if status actually changed
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO rfq_status_history (rfq_id, old_status, new_status, changed_by, notes)
        VALUES (NEW.id, OLD.status, NEW.status, NEW.assigned_to, 'Status changed automatically');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic status logging
CREATE TRIGGER trigger_log_rfq_status_change
    AFTER UPDATE ON rfqs
    FOR EACH ROW
    EXECUTE FUNCTION log_rfq_status_change();

-- Insert some sample RFQ data for testing
INSERT INTO rfqs (name, email, company, product_interest, message, country, language_code) VALUES
('John Smith', 'john.smith@example.com', 'Tech Solutions Inc', 'laptop-pro-15', 'Interested in bulk purchase of 50 units for our office setup.', 'United States', 'en'),
('Maria Garcia', 'maria@empresa.es', 'Empresa Industrial', 'laptop-ultra-14', 'Necesitamos cotización para 20 laptops para nuestro equipo de ingeniería.', 'Spain', 'es'),
('Hiroshi Tanaka', 'tanaka@company.jp', 'Tokyo Manufacturing', 'laptop-pro-15', '製造業向けの産業用ノートパソコンの見積もりをお願いします。', 'Japan', 'ja');

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON rfqs TO anon;
GRANT ALL ON rfqs TO authenticated;
GRANT ALL ON rfqs TO service_role;
GRANT SELECT, INSERT ON rfq_status_history TO authenticated;
GRANT ALL ON rfq_status_history TO service_role;
