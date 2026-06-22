import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero-section">
      <h1>Service Marketplace</h1>

      <p>
        Find trusted professionals and book services
        easily from our platform.
      </p>

      <div className="hero-buttons">
        <Link
          to="/services"
          className="hero-btn"
        >
          Explore Services
        </Link>

        <Link
          to="/register"
          className="hero-btn secondary"
        >
          Join Now
        </Link>
      </div>
    </div>
  );
}

export default Home;