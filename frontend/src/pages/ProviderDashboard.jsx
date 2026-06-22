import { useEffect, useState } from "react";
import API from "../services/api";

function ProviderDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.get("/dashboard/provider", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container dashboard">
      <h1>Provider Dashboard</h1>

      {!stats ? (
        <p>Loading...</p>
      ) : (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Services</h3>
            <p className="stat-value">{stats.totalServices}</p>
          </div>

          <div className="stat-card">
            <h3>Active Projects</h3>
            <p className="stat-value">{stats.activeProjects}</p>
          </div>

          <div className="stat-card">
            <h3>Pending Requests</h3>
            <p className="stat-value">{stats.pendingRequests}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProviderDashboard;
