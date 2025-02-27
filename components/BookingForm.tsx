import { useState } from "react";
import axios from "axios";

const BookingForm = ({ userId }: { userId: string }) => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("/api/bookings", {
        userId,
        location,
        startDate,
        endDate,
        travelers,
      });

      alert("Booking successful!");
    } catch (error) {
      console.error("Error booking ticket:", error);
      alert("Failed to book ticket.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      <input type="number" min="1" value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} required />
      <button type="submit">Book Ticket</button>
    </form>
  );
};

export default BookingForm;
