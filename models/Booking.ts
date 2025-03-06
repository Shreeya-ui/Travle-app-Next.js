import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  price: { type: Number, required: true },
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;
