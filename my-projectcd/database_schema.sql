-- Chilli Infestation Dashboard Database Schema
-- This SQL schema can be used to create the database tables for the dashboard

-- Users table for authentication
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Plant disease requests table
CREATE TABLE plant_requests (
    id SERIAL PRIMARY KEY,
    picture_url TEXT NOT NULL,
    disease VARCHAR(255) NOT NULL,
    solution TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
    severity VARCHAR(20) DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by INTEGER REFERENCES users(id),
    reviewed_at TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_plant_requests_status ON plant_requests(status);
CREATE INDEX idx_plant_requests_severity ON plant_requests(severity);
CREATE INDEX idx_plant_requests_created_at ON plant_requests(created_at);
CREATE INDEX idx_plant_requests_location ON plant_requests(location);

-- Insert default admin user (password: admin123, hashed with bcrypt)
INSERT INTO users (username, password_hash, role) VALUES 
('admin', '$2b$10$K7L/8Y.f89J 6vZjHQAdOPEt8pd3.i3L0/.OgxqI4B3kBdQp8WCm', 'admin');

-- Sample data for plant requests
INSERT INTO plant_requests (picture_url, disease, solution, location, status, severity) VALUES 
('https://images.unsplash.com/photo-1544461284-799eb50dc4d3?w=400&h=300&fit=crop', 'Bacterial Leaf Spot', 'Apply copper-based fungicide spray every 7-10 days. Remove affected leaves and improve air circulation around plants.', 'Farm A, Sector 1', 'reviewed', 'high'),
('https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=400&h=300&fit=crop', 'Anthracnose', 'Use resistant varieties, improve drainage, and apply preventive fungicide treatments during humid weather.', 'Farm B, Sector 3', 'pending', 'medium'),
('https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&h=300&fit=crop', 'Powdery Mildew', 'Reduce humidity, increase air circulation, and apply sulfur-based fungicide. Avoid overhead watering.', 'Farm C, Sector 2', 'resolved', 'low'),
('https://images.unsplash.com/photo-1569688148124-30b1a49ce69b?w=400&h=300&fit=crop', 'Aphid Infestation', 'Introduce beneficial insects like ladybugs, use insecticidal soap, or apply neem oil spray.', 'Farm A, Sector 4', 'reviewed', 'medium'),
('https://images.unsplash.com/photo-1594652634010-6a2a2121e4da?w=400&h=300&fit=crop', 'Fusarium Wilt', 'Remove infected plants, improve soil drainage, use disease-free seeds, and apply soil fumigation.', 'Farm D, Sector 1', 'pending', 'high'),
('https://images.unsplash.com/photo-1583925001617-12c7b6e3ab8e?w=400&h=300&fit=crop', 'Spider Mites', 'Increase humidity, use predatory mites, apply miticide sprays, and remove heavily infested leaves.', 'Farm B, Sector 2', 'reviewed', 'medium');

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_plant_requests_updated_at BEFORE UPDATE ON plant_requests 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
