import type { NextApiRequest, NextApiResponse } from 'next';
import { dbSelect, dbRun } from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  try {
    if (method === 'GET') {
      const categories = await dbSelect('SELECT * FROM activity_categories');
      res.status(200).json(categories);
    } else if (method === 'PUT') {
      const { name } = body;
      await dbRun('INSERT INTO activity_categories (name) VALUES (?)', [name]);
      res.status(201).json({ message: 'Category added successfully' });
    } else if (method === 'DELETE') {
      const { id } = query;
      await dbRun('DELETE FROM activity_categories WHERE id = ?', [id]);
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: (error instanceof Error) ? error.message : 'An unknown error occurred' });
  }
}