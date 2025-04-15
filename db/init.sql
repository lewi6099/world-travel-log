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

-- activity_categories table (NEW)
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
    latitude REAL,         -- NEW
    longitude REAL,        -- NEW
    category_id INTEGER,   -- NEW
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

-- Insert Destinations
INSERT INTO destinations (trip_id, name, start_date, end_date) VALUES
    (1, 'Tokyo', '2023-04-01', '2023-04-05'),
    (1, 'Kyoto', '2023-04-06', '2023-04-10'),
    (1, 'Osaka', '2023-04-11', '2023-04-14'),
    (2, 'Paris', '2022-07-05', '2022-07-10'),
    (2, 'Amsterdam', '2022-07-11', '2022-07-15'),
    (2, 'Berlin', '2022-07-16', '2022-07-20'),
    (3, 'Sedona', '2024-11-10', '2024-11-14'),
    (3, 'Grand Canyon', '2024-11-15', '2024-11-17'),
    (3, 'Las Vegas', '2024-11-18', '2024-11-20');

-- Insert Expenses
INSERT INTO expenses (destination_id, amount, description, date) VALUES
    (1, 250.00, 'Hotel in Shibuya', '2023-04-01'),
    (2, 90.00, 'Train to Kyoto', '2023-04-06'),
    (4, 300.00, 'Airbnb in Paris', '2022-07-05'),
    (6, 120.00, 'Museum pass', '2022-07-18'),
    (7, 80.00, 'Hiking gear', '2024-11-11'),
    (9, 200.00, 'Vegas hotel', '2024-11-18');

-- Insert Activities (with coordinates and categories)
INSERT INTO activities (destination_id, name, description, date, latitude, longitude, category_id) VALUES
    (1, 'Shibuya Crossing', 'Watched the crowd from a cafe.', '2023-04-02', 35.6595, 139.7004, 4),
    (1, 'Sushi Dinner', 'Omakase sushi experience.', '2023-04-03', 35.6620, 139.7040, 1),
    (2, 'Fushimi Inari Shrine', 'Hiked the torii gate path.', '2023-04-07', 34.9671, 135.7727, 4),
    (4, 'Eiffel Tower', 'Evening light show.', '2022-07-06', 48.8584, 2.2945, 4),
    (5, 'Canal Tour', 'Beautiful boat ride.', '2022-07-12', 52.3702, 4.8952, 4),
    (6, 'Bar Crawl', 'Visited 3 local spots.', '2022-07-18', 52.5200, 13.4050, 2),
    (7, 'Cathedral Rock Hike', 'Sunset view was amazing.', '2024-11-11', 34.8222, -111.8080, 4),
    (9, 'Buffet Dinner', 'Endless seafood buffet.', '2024-11-18', 36.1147, -115.1728, 1),
    (9, 'Casino Night', 'Won $50 on blackjack!', '2024-11-19', 36.1162, -115.1745, 2);
