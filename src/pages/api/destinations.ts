import type { NextApiRequest, NextApiResponse } from 'next';
import { dbSelect, dbRun } from './db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body, query } = req;

  try {
    if (method === 'GET') {
      const { trip_id } = query;

      if (trip_id) {
        // Fetch destinations for a specific trip_id
        const destinations = await dbSelect(
          'SELECT * FROM destinations WHERE trip_id = ?',
          [trip_id]
        );
        res.status(200).json(destinations);
      } else {
        // Fetch all destinations
        const destinations = await dbSelect('SELECT * FROM destinations');
        res.status(200).json(destinations);
      }
    } else if (method === 'PUT') {
      const { trip_id, name, start_date, end_date, latitude, longitude } = body;

      if (!trip_id || !name) {
        res.status(400).json({ error: 'trip_id and name are required' });
        return;
      }

      await dbRun(
        'INSERT INTO destinations (trip_id, name, start_date, end_date, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)',
        [trip_id, name, start_date, end_date, latitude, longitude]
      );
      res.status(201).json({ message: 'Destination added successfully' });
    } else if (method === 'DELETE') {
      const { id } = query;

      if (!id) {
        res.status(400).json({ error: 'id is required' });
        return;
      }

      await dbRun('DELETE FROM destinations WHERE id = ?', [id]);
      res.status(200).json({ message: 'Destination deleted successfully' });
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
}