import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

// Dynamically import the MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("../components/MainMap"), {
  ssr: false,
});
import { Trip } from "../types/DatabaseTypes";
import NewTripModal from "@/components/NewTripModal";

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [newTripModalVisible, setNewTripModalVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch("/api/trips");
        const data = await response.json();
        setTrips(data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []);

  const handleRowClick = (id: number) => {
    router.push(`/trip/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-8 p-4">
      {/* Map Section */}
      
      <div className="w-full max-w-4xl h-96 rounded-lg shadow-lg overflow-hidden border border-gray-300">
        {!newTripModalVisible && (
            <MapComponent />
        )}
      </div>

      {/* Table Section */}
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Trips</h2>
          <div className="flex space-x-4">
            {/* New Trip Button */}
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setNewTripModalVisible(true)}
            >
              New Trip
            </button>

            {/* New Activity Category Button */}
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              onClick={() => alert("New Activity Category button clicked!")}
            >
              New Activity Category
            </button>
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr
                key={trip.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-blue-100 transition-colors cursor-pointer"
                onClick={() => handleRowClick(trip.id)}
              >
                <td className="border border-gray-300 px-4 py-2">{trip.name}</td>
                <td className="border border-gray-300 px-4 py-2">{trip.start_date}</td>
                <td className="border border-gray-300 px-4 py-2">{trip.end_date}</td>
                <td className="border border-gray-300 px-4 py-2">{trip.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NewTripModal visible={newTripModalVisible} setVisible={setNewTripModalVisible} />
    </div>
  );
}
