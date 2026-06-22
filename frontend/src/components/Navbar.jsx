import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2 className="logo">Service Marketplace</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        <Link to="/services">Services</Link>

        {token && (
          <>
            <Link to="/my-bookings">My Bookings</Link>
            {role === "customer" && <Link to="/dashboard/customer">Dashboard</Link>}
            {role === "provider" && <Link to="/dashboard/provider">Dashboard</Link>}
            {role === "admin" && <Link to="/dashboard/admin">Admin</Link>}
          </>
        )}

        {token && (
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;