import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Services() {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const CATEGORIES = ["All", "Development", "Design", "Writing", "Marketing"];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await API.get("/services");
      setServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (serviceId) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/bookings",
        {
          service: serviceId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking created successfully");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking failed"
      );
    }
  };

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return services.filter((s) => {
      const matchesTitle = s.title?.toLowerCase().includes(term);
      const matchesCategory = category === "All" || s.category === category;
      return matchesTitle && matchesCategory;
    });
  }, [services, searchTerm, category]);

  return (
    <div className="container">
      <h1>Services</h1>

      <div className="services-controls">
        <input
          className="search-input"
          placeholder="Search services by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No services match your search.</p>
      ) : (
        <div className="services-grid">
          {filtered.map((service) => (
            <article className="service-card" key={service._id}>
              <div className="service-card-header">
                <div className="service-icon" aria-hidden>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L3 7v7c0 5 5 9 9 9s9-4 9-9V7l-9-5z" fill="#2563eb" opacity="0.15"/>
                    <path d="M12 2L3 7v7c0 5 5 9 9 9s9-4 9-9V7l-9-5z" stroke="#2563eb" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="service-title">{service.title}</h2>
                <span className="service-category">{service.category}</span>
              </div>

              <p className="service-desc">{service.description}</p>

              <div className="service-meta">
                <div className="meta-item">
                  <strong>Price:</strong> Rs. {service.price}
                </div>
                <div className="meta-item">
                  <strong>Delivery:</strong> {service.deliveryTime}
                </div>
              </div>

              <div className="service-actions">
                {role === "customer" && (
                  <button
                    className="book-btn"
                    onClick={() => handleBooking(service._id)}
                  >
                    Book Service
                  </button>
                )}

                {role === "provider" && (
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit-service/${service._id}`)}
                  >
                    Edit Service
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Services;