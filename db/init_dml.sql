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
    ('Desert Escape', '2024-11-10', '2024-11-20', 'Exploring the southwest.'),
    ('Tropical Paradise', '2023-12-01', '2023-12-10', 'Relaxing on the beach.'),
    ('Mountain Expedition', '2023-09-15', '2023-09-25', 'Hiking and camping in the Rockies.'),
    ('City Lights', '2023-05-01', '2023-05-07', 'Exploring urban life.'),
    ('Historical Tour', '2023-06-10', '2023-06-20', 'Visiting ancient landmarks.'),
    ('Island Hopping', '2023-08-01', '2023-08-15', 'Exploring tropical islands.'),
    ('Winter Wonderland', '2023-12-20', '2023-12-30', 'Skiing and snowboarding.');

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
    (3, 'Las Vegas', '2024-11-18', '2024-11-20', 36.1699, -115.1398),
    (4, 'Maui', '2023-12-01', '2023-12-05', 20.7984, -156.3319),
    (4, 'Honolulu', '2023-12-06', '2023-12-10', 21.3069, -157.8583),
    (5, 'Denver', '2023-09-15', '2023-09-18', 39.7392, -104.9903),
    (5, 'Rocky Mountain National Park', '2023-09-19', '2023-09-25', 40.3428, -105.6836),
    (6, 'New York City', '2023-05-01', '2023-05-07', 40.7128, -74.0060),
    (7, 'Rome', '2023-06-10', '2023-06-15', 41.9028, 12.4964),
    (7, 'Athens', '2023-06-16', '2023-06-20', 37.9838, 23.7275),
    (8, 'Bali', '2023-08-01', '2023-08-07', -8.3405, 115.0920),
    (8, 'Maldives', '2023-08-08', '2023-08-15', 3.2028, 73.2207),
    (9, 'Aspen', '2023-12-20', '2023-12-25', 39.1911, -106.8175),
    (9, 'Vail', '2023-12-26', '2023-12-30', 39.6403, -106.3742);

-- Insert Expenses
INSERT INTO expenses (destination_id, amount, description, date) VALUES
    (1, 250.00, 'Hotel in Shibuya', '2023-04-01'),
    (2, 90.00, 'Train to Kyoto', '2023-04-06'),
    (4, 300.00, 'Airbnb in Paris', '2022-07-05'),
    (6, 120.00, 'Museum pass', '2022-07-18'),
    (7, 80.00, 'Hiking gear', '2024-11-11'),
    (9, 200.00, 'Vegas hotel', '2024-11-18'),
    (10, 500.00, 'Beachfront resort', '2023-12-02'),
    (12, 150.00, 'Ski rental', '2023-12-21'),
    (15, 400.00, 'Broadway show tickets', '2023-05-03'),
    (17, 250.00, 'Guided tour of the Colosseum', '2023-06-11'),
    (19, 600.00, 'Overwater villa', '2023-08-09');

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
    (9, 'Casino Night', 'Won $50 on blackjack!', '2024-11-19', 2),
    (10, 'Snorkeling', 'Explored coral reefs.', '2023-12-03', 7),
    (12, 'Skiing', 'Hit the slopes all day.', '2023-12-22', 7),
    (15, 'Statue of Liberty', 'Took the ferry to Liberty Island.', '2023-05-02', 4),
    (17, 'Vatican Museum', 'Saw the Sistine Chapel.', '2023-06-12', 4),
    (19, 'Scuba Diving', 'Dived with manta rays.', '2023-08-10', 7);
