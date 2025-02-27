import { useState } from "react";
import axios from "axios";

const BookTicket = () => {
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please log in to book a ticket.");
      return;
    }

    try {
      const response = await axios.post(
        "/api/book-ticket",
        { location, startDate, endDate, travelers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(response.data.message);
    } catch (error) {
      console.error("Booking failed:", error);
      setMessage("Booking failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Book a Ticket</h2>
      <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      <input type="number" value={travelers} onChange={(e) => setTravelers(Number(e.target.value))} />

      <button onClick={handleBooking}>Book Now</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BookTicket;
