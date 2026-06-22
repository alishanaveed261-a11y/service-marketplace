import { useEffect, useState } from "react";
import API from "../services/api";

function CustomerDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/dashboard/customer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container dashboard">
      <h1>Customer Dashboard</h1>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Active Bookings</h3>
            <p className="stat-value">{stats.activeBookings}</p>
          </div>

          <div className="stat-card">
            <h3>Completed Projects</h3>
            <p className="stat-value">{stats.completedProjects}</p>
          </div>

          <div className="stat-card">
            <h3>Total Requests</h3>
            <p className="stat-value">{stats.totalRequests}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerDashboard;
