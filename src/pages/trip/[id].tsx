import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Trip, Destination, Activity, Expense, ActivityCategory } from "../../types/DatabaseTypes";
import NewFeatureModal from "@/components/NewFeatureModal";

// Dynamically import the TripMap component to avoid SSR issues with Leaflet
const TripMap = dynamic(() => import("../../components/TripMap"), {
  ssr: false,
});

export default function TripPage() {
  const router = useRouter();
  const { id } = router.query;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [newFeatureModalVisible, setNewFeatureModalVisible] = useState<boolean>(false);
  const [destinations, setDestinations] = useState<Destination[] | null>(null);
  const [selectedDestinationId, setSelectedDestinationId] = useState<number | null>(null);
  const [activities, setActivities] = useState<Activity[] | null>(null);
  const [expenses, setExpenses] = useState<Expense[] | null>(null);
  const [activityCategories, setActivityCategories] = useState<ActivityCategory[] | null>(null);

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
      const fetchDestinations = async () => {
        try {
          const response = await fetch(`/api/destinations?trip_id=${id}`);
          const data = await response.json();
          setDestinations(data);
        } catch (error) {
          console.error("Error fetching destinations:", error);
        }
      };
      fetchDestinations();
      fetchTrip();
    }
  }, [id]);

  useEffect(() => {
    if (destinations) {
      const fetchActivities = async () => {
        const destinationIds = destinations.map((destination) => destination.id).join(",");
        try {
          const response = await fetch(`/api/activities?destination_id=${destinationIds}`);
          const data = await response.json();
          setActivities(data);
        } catch (error) {
          console.error("Error fetching activities:", error);
        }
      };
      const fetchExpenses = async () => {
        const destinationIds = destinations.map((destination) => destination.id).join(",");
        try {
          const response = await fetch(`/api/expenses?destination_id=${destinationIds}`);
          const data = await response.json();
          setExpenses(data);
        } catch (error) {
          console.error("Error fetching expenses:", error);
        }
      };
      fetchActivities();
      fetchExpenses();
    }
  }, [destinations]);

  // Fetch Activity Categories
  useEffect(() => {
    const fetchActivityCategories = async () => {
      try {
        const response = await fetch(`/api/activity-categories`);
        const data = await response.json();
        setActivityCategories(data);
      } catch (error) {
        console.error("Error fetching activity categories:", error);
      }
    };
    fetchActivityCategories();
  }, []);

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => router.push("/")}
      >
        Back to Home
      </button>

      {/* Add Feature Button */}
      <button
        className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        onClick={() => setNewFeatureModalVisible(true)}
      >
        Add Feature
      </button>

      {/* Trip Details */}
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

      {/* Map Section */}
      {destinations && !newFeatureModalVisible && (
        <div className="w-full max-w-4xl h-96 rounded-lg shadow-lg overflow-hidden border border-gray-300 mt-8">
          <TripMap destinations={destinations} />
        </div>
      )}

      {/* Destinations Table Section */}
      {destinations && destinations.length > 0 && (
        <div className="w-full max-w-4xl mt-8">
          <h2 className="text-xl font-bold mb-4">Destinations</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Start Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">End Date</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((destination) => (
                <tr
                  key={destination.id}
                  className={`hover:bg-blue-100 transition-colors cursor-pointer ${
                    selectedDestinationId === destination.id ? "bg-blue-200" : "odd:bg-white even:bg-gray-50"
                  }`}
                  onClick={() => setSelectedDestinationId(destination.id)} // Set the selected destination ID
                >
                  <td className="border border-gray-300 px-4 py-2">{destination.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{destination.start_date}</td>
                  <td className="border border-gray-300 px-4 py-2">{destination.end_date}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Clear Selection Button */}
          {selectedDestinationId !== null && (
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => setSelectedDestinationId(null)} // Clear the selected destination
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
      )}

      {/* Activities Table Section */}
      {activities && activities.length > 0 && (
        <div className="w-full max-w-4xl mt-8">
          <h2 className="text-xl font-bold mb-4">Activities</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Category</th>
              </tr>
            </thead>
            <tbody>
              {activities
                .filter(
                  (activity) =>
                    selectedDestinationId === null ||
                    activity.destination_id === selectedDestinationId
                )
                .map((activity) => {
                  const location = destinations?.find(
                    (destination) => destination.id === activity.destination_id
                  )?.name || "Unknown";

                  const categoryName =
                    activityCategories?.find(
                      (category) => category.id === activity.category_id
                    )?.name || "Unknown";

                  return (
                    <tr
                      key={activity.id}
                      className="odd:bg-white even:bg-gray-50 hover:bg-blue-100 transition-colors"
                    >
                      <td className="border border-gray-300 px-4 py-2">{activity.name}</td>
                      <td className="border border-gray-300 px-4 py-2">{location}</td>
                      <td className="border border-gray-300 px-4 py-2">{activity.description}</td>
                      <td className="border border-gray-300 px-4 py-2">{activity.date}</td>
                      <td className="border border-gray-300 px-4 py-2">{categoryName}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}

      {/* Expenses Table Section */}
      {expenses && expenses.length > 0 && (
        <div className="w-full max-w-4xl mt-8">
          <h2 className="text-xl font-bold mb-4">Expenses</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Destination</th>
              </tr>
            </thead>
            <tbody>
              {expenses
                .filter(
                  (expense) =>
                    selectedDestinationId === null ||
                    expense.destination_id === selectedDestinationId
                )
                .map((expense) => {
                  const destination = destinations?.find(
                    (destination) => destination.id === expense.destination_id
                  )?.name || "Unknown";
    
                  return (
                    <tr
                      key={expense.id}
                      className="odd:bg-white even:bg-gray-50 hover:bg-blue-100 transition-colors"
                    >
                      <td className="border border-gray-300 px-4 py-2">{expense.description}</td>
                      <td className="border border-gray-300 px-4 py-2">${expense.amount.toFixed(2)}</td>
                      <td className="border border-gray-300 px-4 py-2">{expense.date}</td>
                      <td className="border border-gray-300 px-4 py-2">{destination}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      )}
      {/* New Feature Modal */}
      <NewFeatureModal 
        visible={newFeatureModalVisible} 
        setVisible={setNewFeatureModalVisible} 
        tripId={id} 
        activityCategories={activityCategories || []} 
        destinations={destinations || []}/>
    </div>
  );
}