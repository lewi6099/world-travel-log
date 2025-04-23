import React, { useEffect, useState } from "react";
import { ActivityCategory, Destination } from "../types/DatabaseTypes";

interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  tripId: String | String[] | undefined;
  activityCategories: ActivityCategory[];
  destinations: Destination[];
}

const NewFeatureModal: React.FC<ModalProps> = ({ visible, setVisible, tripId, activityCategories, destinations }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [activityCategory, setActivityCategory] = useState<string>("");

  // Reset state when modal is open/closed
  useEffect(() => {
    setSelectedOption(null);
  }, [visible]);

  // Reset all inputs when selectedOption changes or modal is opened/closed
  useEffect(() => {
    setName("");
    setStartDate("");
    setEndDate("");
    setLatitude("");
    setLongitude("");
    setAmount("");
    setDescription("");
    setDestination("");
    setActivityCategory("");
  }, [selectedOption, visible]);

  const handleSubmit = async () => {
    if (!verifyInputs()) {
      return;
    }

    try {
      switch (selectedOption) {
        case 0: // Add new destination
          console.log("Adding new destination");
          await fetch("/api/destinations", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              trip_id: tripId,
              name: name,
              start_date: startDate,
              end_date: endDate,
              latitude: latitude,
              longitude: longitude,
            }),
          });
          break;

        case 1: // Add new activity
          console.log("Adding new activity");
          await fetch("/api/activities", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              destination_id: destination,
              name: name,
              description: description,
              date: startDate,
              category_id: activityCategory,
            }),
          });
          break;

        case 2: // Add new expense
          console.log("Adding new expense");
          await fetch("/api/expenses", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              destination_id: destination,
              amount: parseFloat(amount),
              description: description,
              date: startDate,
            }),
          });
          break;

        default:
          console.error("Invalid option selected");
          break;
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    // Reset state after submission
    setVisible(false);
  };

  const verifyInputs = () => {
    switch (selectedOption) {
      case 0: // Destination
        if (!tripId || !name || !startDate || !endDate || !latitude || !longitude) {
          alert("Please fill in all fields for the destination.");
          return false;
        }
        break;

      case 1: // Activity
        if (!destination || !name || !startDate || !activityCategory || !description) {
          alert("Please fill in all fields for the activity.");
          return false;
        }
        break;

      case 2: // Expense
        if (!destination || !amount || !description || !startDate) {
          alert("Please fill in all fields for the expense.");
          return false;
        }
        break;

      default:
        alert("Please select a valid option.");
        return false;
    }
    return true;
  };

  const handleOptionChange = (value: string) => {
    switch (value) {
      case "Destination":
        setSelectedOption(0);
        break;
      case "Activity":
        setSelectedOption(1);
        break;
      case "Expenses":
        setSelectedOption(2);
        break;
      default:
        setSelectedOption(null);
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) setVisible(false);
      }}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New Feature</h2>

        {/* Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select an Option</label>
          <select
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            onChange={(e) => handleOptionChange(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="Destination">Destination</option>
            <option value="Activity">Activity</option>
            <option value="Expenses">Expenses</option>
          </select>
        </div>

        {selectedOption == 0 && (
          <>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Destination Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter a destination"
              />
            </div>

            {/* Start Date Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* End Date Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            {/* Latitude Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Latitude</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="Enter latitude"
              />
            </div>

            {/* Longitude Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Longitude</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="Enter longitude"
              />
            </div>
          </>
        )}
        {selectedOption == 1 && (
          <>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Activity Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter an activity name"
              />
            </div>

            {/* Destination Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select a Destination</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">-- Select --</option>
                {destinations.map((destination) => (
                  <option key={destination.id} value={destination.id}>
                    {destination.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Activity Category Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select an Activity Category</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                onChange={(e) => setActivityCategory(e.target.value)}
              >
                <option value="">-- Select --</option>
                {activityCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description"
                rows={4}
              ></textarea>
            </div>
          </>
        )}
        {selectedOption == 2 && (
          <>
            {/* Amount Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter the amount"
              />
            </div>

            {/* Description Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description"
                rows={4}
              ></textarea>
            </div>

            {/* Destination Dropdown */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select a Destination</label>
              <select
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">-- Select --</option>
                {destinations.map((destination) => (
                  <option key={destination.id} value={destination.id}>
                    {destination.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Selector */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
          </>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() => setVisible(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewFeatureModal;