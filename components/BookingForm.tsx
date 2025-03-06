import { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId'); // Ensure userId is stored in localStorage upon login

    if (!userId) {
      alert('User not logged in');
      return;
    }

    try {
      setLoading(true);
      await axios.post('/api/bookings', {
        userId,
        location,
        startDate,
        endDate,
        travelers,
      });

      alert('Booking saved successfully');
      // Reset form or redirect as needed
    } catch (error: any) {
      console.error('Error saving booking:', error);
      alert('Failed to save booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for location, startDate, endDate, travelers */}
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Booking'}
      </button>
    </form>
  );
};

export default BookingForm;
