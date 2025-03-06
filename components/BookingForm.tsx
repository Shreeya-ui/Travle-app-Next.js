import { useState } from "react";
import axios from "axios";

const BookingForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in");
      return;
    }

    const bookingData = {
      userId,
      location: formData.get("location") as string,
      startDate: formData.get("startDate") as string,
      endDate: formData.get("endDate") as string,
      travelers: Number(formData.get("travelers")),
    };

    try {
      setLoading(true);
      await axios.post("/api/bookings", bookingData);
      alert("Booking saved successfully");
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Failed to save booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label className="block">Location:</label>
        <input name="location" type="text" className="border p-2 rounded w-full" required />
      </div>

      <div>
        <label className="block">Start Date:</label>
        <input name="startDate" type="date" className="border p-2 rounded w-full" required />
      </div>

      <div>
        <label className="block">End Date:</label>
        <input name="endDate" type="date" className="border p-2 rounded w-full" required />
      </div>

      <div>
        <label className="block">Number of Travelers:</label>
        <input name="travelers" type="number" min="1" className="border p-2 rounded w-full" required />
      </div>

      <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
        {loading ? "Saving..." : "Save Booking"}
      </button>
    </form>
  );
};

export default BookingForm;
