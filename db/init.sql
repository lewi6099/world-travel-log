-- DDL for SQLite database
-- trips table
CREATE TABLE IF NOT EXISTS trips (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    notes TEXT
);

-- destinations table
CREATE TABLE IF NOT EXISTS destinations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    trip_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    start_date TEXT,
    end_date TEXT,
    latitude REAL,
    longitude REAL,
    FOREIGN KEY (trip_id) REFERENCES trips(id)
);

-- expenses table
CREATE TABLE IF NOT EXISTS expenses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    destination_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    description TEXT,
    date TEXT,
    FOREIGN KEY (destination_id) REFERENCES destinations(id)
);

-- activity_categories table
CREATE TABLE IF NOT EXISTS activity_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL
);

-- activities table (updated)
CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    destination_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    date TEXT,
    category_id INTEGER,
    FOREIGN KEY (destination_id) REFERENCES destinations(id),
    FOREIGN KEY (category_id) REFERENCES activity_categories(id)
);

-- DML for sample data
-- Insert activity categories (if not already in)
INSERT OR IGNORE INTO activity_categories (name) VALUES
    ('Restaurant'),
    ('Bar'),
    ('Housing'),
    ('Activity'),
    ('Other');

-- Insert Trips
INSERT INTO trips (name, start_date, end_date, notes) VALUES
    ('Japan Adventure', '2023-04-01', '2023-04-14', 'Cherry blossom season!'),
    ('Euro Summer', '2022-07-05', '2022-08-01', 'Backpacking through Europe.'),
    ('Desert Escape', '2024-11-10', '2024-11-20', 'Exploring the southwest.');

-- Insert Destinations (updated with latitude and longitude)
INSERT INTO destinations (trip_id, name, start_date, end_date, latitude, longitude) VALUES
    (1, 'Tokyo', '2023-04-01', '2023-04-05', 35.6895, 139.6917),
    (1, 'Kyoto', '2023-04-06', '2023-04-10', 35.0116, 135.7681),
    (1, 'Osaka', '2023-04-11', '2023-04-14', 34.6937, 135.5023),
    (2, 'Paris', '2022-07-05', '2022-07-10', 48.8566, 2.3522),
    (2, 'Amsterdam', '2022-07-11', '2022-07-15', 52.3676, 4.9041),
    (2, 'Berlin', '2022-07-16', '2022-07-20', 52.5200, 13.4050),
    (3, 'Sedona', '2024-11-10', '2024-11-14', 34.8697, -111.7609),
    (3, 'Grand Canyon', '2024-11-15', '2024-11-17', 36.1069, -112.1129),
    (3, 'Las Vegas', '2024-11-18', '2024-11-20', 36.1699, -115.1398);

-- Insert Expenses
INSERT INTO expenses (destination_id, amount, description, date) VALUES
    (1, 250.00, 'Hotel in Shibuya', '2023-04-01'),
    (2, 90.00, 'Train to Kyoto', '2023-04-06'),
    (4, 300.00, 'Airbnb in Paris', '2022-07-05'),
    (6, 120.00, 'Museum pass', '2022-07-18'),
    (7, 80.00, 'Hiking gear', '2024-11-11'),
    (9, 200.00, 'Vegas hotel', '2024-11-18');

-- Insert Activities
INSERT INTO activities (destination_id, name, description, date, category_id) VALUES
    (1, 'Shibuya Crossing', 'Watched the crowd from a cafe.', '2023-04-02', 4),
    (1, 'Sushi Dinner', 'Omakase sushi experience.', '2023-04-03', 1),
    (2, 'Fushimi Inari Shrine', 'Hiked the torii gate path.', '2023-04-07', 4),
    (4, 'Eiffel Tower', 'Evening light show.', '2022-07-06', 4),
    (5, 'Canal Tour', 'Beautiful boat ride.', '2022-07-12', 4),
    (6, 'Bar Crawl', 'Visited 3 local spots.', '2022-07-18', 2),
    (7, 'Cathedral Rock Hike', 'Sunset view was amazing.', '2024-11-11', 4),
    (9, 'Buffet Dinner', 'Endless seafood buffet.', '2024-11-18', 1),
    (9, 'Casino Night', 'Won $50 on blackjack!', '2024-11-19', 2);
