import type { NextApiRequest, NextApiResponse } from 'next';
import { dbSelect, dbRun } from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body, query } = req;

    try {
        if (method === 'GET') {
            const trips = await dbSelect('SELECT * FROM trips');
            res.status(200).json(trips);
        } else if (method === 'PUT') {
            const { name, start_date, end_date, notes } = body;
            await dbRun(
                'INSERT INTO trips (name, start_date, end_date, notes) VALUES (?, ?, ?, ?)',
                [name, start_date, end_date, notes]
            );
            res.status(201).json({ message: 'Trip added successfully' });
        } else if (method === 'DELETE') {
            const { id } = query;
            await dbRun('DELETE FROM trips WHERE id = ?', [id]);
            res.status(200).json({ message: 'Trip deleted successfully' });
        } else {
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });
    }
}