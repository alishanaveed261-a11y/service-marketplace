import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(
        "/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const cancelBooking = async (bookingId) => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
  `/bookings/${bookingId}/cancel`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

    alert("Booking cancelled successfully");

    fetchBookings();
  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Failed to cancel booking"
    );
  }
};

  return (
    <div>
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
  <div key={booking._id}>
    <h3>{booking.service?.title}</h3>

    <p>Status: {booking.status}</p>

    <button
      onClick={() => cancelBooking(booking._id)}
    >
      Cancel Booking
    </button>

    <hr />
  </div>
))
      )}
    </div>
  );
}

export default MyBookings;