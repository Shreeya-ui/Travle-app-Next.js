"use client";

import React from "react";

const Contact = () => {
  return (
    <div className="pt-[12vh] min-h-screen bg-white flex flex-col items-center px-4">
      <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
      <p className="text-lg mt-4 text-gray-700 w-[80%] text-center">
        Have questions? Get in touch with us!
      </p>

      <form className="mt-6 bg-gray-100 p-6 rounded-lg w-[80%] max-w-lg shadow-md">
        <label className="block text-gray-700 text-lg">Name</label>
        <input type="text" className="w-full p-2 border rounded-md mt-1 mb-4" placeholder="Your Name" />

        <label className="block text-gray-700 text-lg">Email</label>
        <input type="email" className="w-full p-2 border rounded-md mt-1 mb-4" placeholder="Your Email" />

        <label className="block text-gray-700 text-lg">Message</label>
        <textarea className="w-full p-2 border rounded-md mt-1 mb-4" rows={4} placeholder="Your Message"></textarea>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
