import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/dashboard/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container dashboard">
      <h1>Admin Dashboard</h1>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>

          <div className="stat-card">
            <h3>Total Services</h3>
            <p className="stat-value">{stats.totalServices}</p>
          </div>

          <div className="stat-card">
            <h3>Total Bookings</h3>
            <p className="stat-value">{stats.totalBookings}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
