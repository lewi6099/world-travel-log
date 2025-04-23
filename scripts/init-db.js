import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const dbPath = path.join(process.cwd(), 'db', 'travel-log.db');
const ddlPath = path.join(process.cwd(), 'db', 'init_ddl.sql');
const dmlPath = path.join(process.cwd(), 'db', 'init_dml.sql');

if (!fs.existsSync(dbPath)) {
  console.log('Initializing database...');
  execSync(`sqlite3 "${dbPath}" < "${ddlPath}"`);
  execSync(`sqlite3 "${dbPath}" < "${dmlPath}"`);
  console.log('Database initialized.');
} else {
  console.log('Database already exists.');
}
