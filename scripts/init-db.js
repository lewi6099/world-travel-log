import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dbPath = path.join(process.cwd(), 'db', 'travel-log.db');
const sqlPath = path.join(process.cwd(), 'db', 'init.sql');

if (!fs.existsSync(dbPath)) {
  console.log('Initializing database...');
  execSync(`sqlite3 "${dbPath}" < "${sqlPath}"`);
  console.log('Database initialized.');
} else {
  console.log('Database already exists.');
}
