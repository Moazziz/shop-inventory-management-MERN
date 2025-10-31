// src/utils/baseUrl.js (for example)
const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api"
    : "https://shop-inventory-management-mern.onrender.com/api";

export default baseUrl;
