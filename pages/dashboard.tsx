"use client";

import React from "react";

const Dashboard = () => {
  return (
    <div className="pt-[12vh] min-h-screen bg-gray-100 flex flex-col items-center px-4">
      <h1 className="text-3xl font-bold text-blue-600">User Dashboard</h1>
      <p className="text-lg mt-4 text-gray-700 w-[80%] text-center">
        Manage your bookings, preferences, and travel history all in one place.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-[80%]">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Trips</h2>
          <p className="text-gray-600">Check your upcoming bookings and itinerary.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-900">Saved Destinations</h2>
          <p className="text-gray-600">View and manage your favorite travel spots.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
          <p className="text-gray-600">Update your personal information and preferences.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
