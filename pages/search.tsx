import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

interface Hotel {
  name: string;
  pricePerNight: number;
  totalPrice: number;
}

const SearchPage = () => {
  const router = useRouter();
  const { location } = router.query;

  const [numPeople, setNumPeople] = useState(1);
  const [numDays, setNumDays] = useState(1);
  const [hotels, setHotels] = useState<Hotel[]>([]); // ✅ Proper type for hotels
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingMessage, setBookingMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!location) return;

    const fetchHotels = async () => {
      try {
        const response = await axios.post("/api/groq-hotels", {
          location,
          numPeople,
          numDays,
        });
        setHotels(response.data.hotels);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hotel details:", err);
        setError("Failed to fetch hotel details.");
        setLoading(false);
      }
    };

    fetchHotels();
  }, [location, numPeople, numDays]);

  const handleBooking = (hotelName: string) => {
    setBookingMessage(`Ticket for ${hotelName} has been booked!`);
  };

  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/search1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="bg-white bg-opacity-80 p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Hotels in &quot;{location}&quot; {/* ✅ Escaped double quotes */}
        </h1>

        <div className="mb-4">
          <label className="block font-semibold">Number of People:</label>
          <input
            type="number"
            min="1"
            value={numPeople}
            onChange={(e) => setNumPeople(parseInt(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold">Number of Days:</label>
          <input
            type="number"
            min="1"
            value={numDays}
            onChange={(e) => setNumDays(parseInt(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        {loading && <p>Loading hotel information...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {hotels.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((hotel) => (
              <div key={hotel.name} className="bg-white p-4 rounded shadow">
                <h2 className="text-xl font-bold">{hotel.name}</h2>
                <p>Price per night: ${hotel.pricePerNight}</p>
                <p>Total Price: ${hotel.totalPrice}</p>
                <button
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => handleBooking(hotel.name)}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}

        {bookingMessage && <p className="text-green-500 mt-4">{bookingMessage}</p>}
      </div>
    </div>
  );
};

export default SearchPage;
