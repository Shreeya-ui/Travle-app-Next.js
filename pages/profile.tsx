import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

interface Booking {
  _id: string;
  location: string;
  startDate: string;
  endDate: string;
  travelers: number;
}

const ProfilePage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("User not logged in");
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/bookings?userId=${userId}`);
        setBookings(response.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p>No bookings found. <Link href="/book" className="text-blue-500 underline">Book now</Link>.</p>
      )}

      <ul className="space-y-4">
        {bookings.map((booking) => (
          <li key={booking._id} className="p-4 border rounded shadow">
            <h2 className="font-semibold">{booking.location}</h2>
            <p>From: {booking.startDate} - To: {booking.endDate}</p>
            <p>Travelers: {booking.travelers}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
