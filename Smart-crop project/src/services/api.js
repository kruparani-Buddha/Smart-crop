// 👉 Render Live Backend URL (Base API URL)
const API_URL = "https://smart-crop-backend-0qon.onrender.com/api";

// Handle Register & Login requests to Backend
export const authenticateUser = async (endpoint, credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error("Auth error:", error);
    return { error: "Network error. Make sure backend server is running." };
  }
};

// Handle Checkout & Order submission to Backend Database
export const submitOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_URL}/orders/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });
    return await response.json();
  } catch (error) {
    console.error("Checkout error:", error);
    return { error: "Network error during checkout." };
  }
};