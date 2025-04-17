import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Trip } from "../../types/DatabaseTypes";

export default function TripPage() {
  const router = useRouter();
  const { id } = router.query;
  const [trip, setTrip] = useState<Trip | null>(null);

  useEffect(() => {
    if (id) {
      const fetchTrip = async () => {
        try {
          const response = await fetch(`/api/trips?id=${id}`);
          const data = await response.json();
          setTrip(data);
        } catch (error) {
          console.error("Error fetching trip:", error);
        }
      };

      fetchTrip();
    }
  }, [id]);

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">{trip.name}</h1>
      <p>
        <strong>Start Date:</strong> {trip.start_date}
      </p>
      <p>
        <strong>End Date:</strong> {trip.end_date}
      </p>
      <p>
        <strong>Notes:</strong> {trip.notes}
      </p>
    </div>
  );
}