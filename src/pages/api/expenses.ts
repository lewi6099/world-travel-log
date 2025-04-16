import type { NextApiRequest, NextApiResponse } from 'next';
import { dbSelect, dbRun } from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body, query } = req;

    try {
        if (method === 'GET') {
            const expenses = await dbSelect('SELECT * FROM expenses');
            res.status(200).json(expenses);
        } else if (method === 'PUT') {
            const { destination_id, amount, description, date } = body;
            await dbRun(
                'INSERT INTO expenses (destination_id, amount, description, date) VALUES (?, ?, ?, ?)',
                [destination_id, amount, description, date]
            );
            res.status(201).json({ message: 'Expense added successfully' });
        } else if (method === 'DELETE') {
            const { id } = query;
            await dbRun('DELETE FROM expenses WHERE id = ?', [id]);
            res.status(200).json({ message: 'Expense deleted successfully' });
        } else {
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });
    }
}