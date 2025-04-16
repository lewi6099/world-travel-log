import sqlite3 from 'sqlite3';
import path from 'path';

const db = new sqlite3.Database(path.resolve('./db/travel-log.db'));

// Helper function for SELECT queries
export function dbSelect<T>(sql: string, params: unknown[] = []): Promise<T[]> {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err: any, rows: T[] | PromiseLike<T[]>) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

// Helper function for INSERT, UPDATE, DELETE queries
export function dbRun(sql: string, params: unknown[] = []): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err: any) => {
            if (err) reject(err);
            else resolve();
        });
    });
}