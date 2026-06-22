import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [updating, setUpdating] = useState(null);
  const [newStatus, setNewStatus] = useState("accepted");
  const role = localStorage.getItem("role");

  const STATUS_COLORS = {
    pending: "badge-pending",
    accepted: "badge-accepted",
    in_progress: "badge-in_progress",
    completed: "badge-completed",
    delivered: "badge-delivered",
    cancelled: "badge-cancelled",
  };

  const statusKey = (s) => {
    if (!s) return s;
    if (s === "in progress") return "in_progress"; // normalize legacy
    return s;
  };

  const humanLabel = (s) => {
    if (!s) return "";
    if (s === "in_progress") return "In Progress";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = role === "provider" ? "/bookings/provider" : "/bookings/my-bookings";
      const response = await API.get(url, { headers: { Authorization: `Bearer ${token}` } });
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(`/bookings/${bookingId}/cancel`, {}, { headers: { Authorization: `Bearer ${token}` } });
      alert("Booking cancelled successfully");
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  const updateStatus = async (bookingId) => {
    try {
      setUpdating(bookingId);
      const token = localStorage.getItem("token");
      await API.put(`/bookings/${bookingId}/status`, { status: newStatus }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Status updated");
      setUpdating(null);
      fetchBookings();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
      setUpdating(null);
    }
  };

  return (
    <div className="container">
      <h1>My Bookings</h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div className="booking-card" key={booking._id}>
            <h2>{booking.service?.title || "Service"}</h2>

            <p>
              <strong>Status:</strong>{" "}
              <span className={`badge ${STATUS_COLORS[statusKey(booking.status)] || ""}`}>
                {humanLabel(statusKey(booking.status))}
              </span>
            </p>

            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button className="cancel-btn" onClick={() => cancelBooking(booking._id)}>
                Cancel Booking
              </button>

              {role === "provider" && (
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                    <option value="accepted">Accepted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button className="form-button" onClick={() => updateStatus(booking._id)} disabled={updating === booking._id}>
                    {updating === booking._id ? "Updating..." : "Update Status"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;