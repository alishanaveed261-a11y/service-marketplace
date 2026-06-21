import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Home</Link> |{" "}

      {!token && (
        <>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/register">Register</Link> |{" "}
        </>
      )}

      <Link to="/services">Services</Link> |{" "}
      <Link to="/my-bookings">My Bookings</Link>

      {token && (
        <>
          {" | "}
          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;