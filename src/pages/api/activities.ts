import type { NextApiRequest, NextApiResponse } from 'next';
import { dbSelect, dbRun } from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body, query } = req;

    try {
        if (method === 'GET') {
            const activities = await dbSelect('SELECT * FROM activities');
            res.status(200).json(activities);
        } else if (method === 'PUT') {
            const { destination_id, name, description, date, latitude, longitude, category_id } = body;
            await dbRun(
                'INSERT INTO activities (destination_id, name, description, date, latitude, longitude, category_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [destination_id, name, description, date, latitude, longitude, category_id]
            );
            res.status(201).json({ message: 'Activity added successfully' });
        } else if (method === 'DELETE') {
            const { id } = query;
            await dbRun('DELETE FROM activities WHERE id = ?', [id]);
            res.status(200).json({ message: 'Activity deleted successfully' });
        } else {
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });
    }
}