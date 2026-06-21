import { useEffect, useState } from "react";
import API from "../services/api";

function Services() {
  const [services, setServices] = useState([]);

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
    alert(error.response?.data?.message || "Booking failed");
  }
};
  return (
    <div>
      <h1>Services</h1>

      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
       services.map((service) => (
  <div key={service._id}>
    <h2>{service.title}</h2>
    <p>{service.description}</p>
    <p>Price: Rs. {service.price}</p>
    <p>Category: {service.category}</p>

    <button
      onClick={() => handleBooking(service._id)}
    >
      Book Service
    </button>

    <hr />
  </div>
))
      )}
    </div>
  );
}

export default Services;