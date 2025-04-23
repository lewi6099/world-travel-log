import React, { useState, useEffect } from "react";

interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const NewTripModal: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  // Reset all inputs when modal is opened/closed
  useEffect(() => {
    setName("");
    setStartDate("");
    setEndDate("");
    setNotes("");
  }, [visible]);

  const handleSubmit = async () => {
    if (!name || !startDate || !endDate) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/trips/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          start_date: startDate,
          end_date: endDate,
          notes: notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add trip");
      }

      console.log("Trip added successfully");
      setVisible(false);
    } catch (error) {
      console.error("Error submitting trip:", error);
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
        <h2 className="text-xl font-bold mb-4">Add New Trip</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Trip Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the trip name"
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

        {/* Notes Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter any notes about the trip"
            rows={4}
          ></textarea>
        </div>

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

export default NewTripModal;