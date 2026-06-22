import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    deliveryTime: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/services/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Service updated successfully");

      navigate("/services");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Update failed"
      );
    }
  };

  return (
    <div className="form-container">
      <h1>Edit Service</h1>

      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
        />

        <input
          className="form-input"
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <input
          className="form-input"
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
        />

        <input
          className="form-input"
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          className="form-input"
          type="text"
          name="deliveryTime"
          placeholder="Delivery Time"
          onChange={handleChange}
        />

        <button
          className="form-button"
          type="submit"
        >
          Update Service
        </button>
      </form>
    </div>
  );
}

export default EditService;