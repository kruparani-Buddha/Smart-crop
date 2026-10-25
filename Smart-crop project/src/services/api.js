const API_URL = "http://localhost:5000/api";

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
    return { error: "Network error during checkout." };
  }
};