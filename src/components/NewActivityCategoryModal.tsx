import React, { useState, useEffect } from "react";

interface ModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const NewActivityCategoryModal: React.FC<ModalProps> = ({ visible, setVisible }) => {
  const [name, setName] = useState<string>("");

  // Reset input when modal is opened/closed
  useEffect(() => {
    setName("");
  }, [visible]);

  const handleSubmit = async () => {
    if (!name) {
      alert("Please enter a category name.");
      return;
    }

    try {
      const response = await fetch("/api/activity-categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add activity category");
      }

      console.log("Activity category added successfully");
      setVisible(false); // Close the modal after submission
      window.location.reload();
    } catch (error) {
      console.error("Error submitting activity category:", error);
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
        <h2 className="text-xl font-bold mb-4">Add New Activity Category</h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category Name</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the category name"
          />
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

export default NewActivityCategoryModal;