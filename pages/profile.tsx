"use client"; // Ensures this runs on the client side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

interface Booking {
  location: string;
  startDate: string;
  endDate: string;
  travelers: number;
}

interface User {
  name: string;
  email: string;
  bookings: Booking[];
}

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // Wait until session loads

    if (!session?.user?.email) {
      alert("You need to log in first!");
      router.push("/login");
      return;
    }

    const fetchUserBookings = async () => {
      try {
        const response = await axios.get(`/api/user/bookings?email=${session.user.email}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserBookings();
  }, [session, status, router]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <>
          <h2 className="text-2xl mt-2">Welcome, {user.name}</h2>
          <h3 className="text-xl font-semibold mt-4">Your Booked Tickets:</h3>
          {user.bookings.length > 0 ? (
            <ul className="mt-2 space-y-4">
              {user.bookings.map((booking, index) => (
                <li key={index} className="p-4 border rounded-lg shadow">
                  <strong>{booking.location}</strong> <br />
                  <span>From: {new Date(booking.startDate).toLocaleDateString()}</span> <br />
                  <span>To: {new Date(booking.endDate).toLocaleDateString()}</span> <br />
                  <span>Travelers: {booking.travelers}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bookings found.</p>
          )}
        </>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default ProfilePage;
