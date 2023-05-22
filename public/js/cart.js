const API_BASE_URL = "http://localhost:3000/api";
const token = localStorage.getItem("token");

const getData = async (url, token) => {
  const result = await fetch(url, {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  const data = await result.json();
  return data;
};

const postData = async (url, data, token) => {
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.error("Error:", error);
    });
};

const putData = async (url, token) => {
  return await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.error("Error:", error);
    });
};

const deleteData = async (url, token) => {
  return await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      console.error("Error:", error);
    });
};

const addToCart = async (productId) => {
  const ORDERS_URL = `${API_BASE_URL}/orders`;
  const data = {
    productId,
    quantity: 0,
  };
  const response = await postData(ORDERS_URL, data, token);
  alert(response)
  window.location.reload();

};

const removeOneProduct = async (itemId) => {
    const ENDPOINT = `${API_BASE_URL}/orders/${itemId}`;
    const response = await  putData(ENDPOINT, token);
    alert(response)
    window.location.reload();
};

const removeAllOfOneProduct = async (itemId) => {
    const ENDPOINT = `${API_BASE_URL}/orders/${itemId}`;
    const response = await  deleteData(ENDPOINT, token);
    alert(response)
    window.location.reload();
};

const clearCart = async (orderId) => {
    const ENDPOINT = `${API_BASE_URL}/orders/clear/${orderId}`;
    const response = await  putData(ENDPOINT, token);
    alert(response)
    window.location.reload();
};
