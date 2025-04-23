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
