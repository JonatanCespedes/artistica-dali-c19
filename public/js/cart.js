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

const addToCart = async (productId) => {
  const ORDERS_URL = `${API_BASE_URL}/orders`;
  const data = {
    productId,
    quantity: 0,
  };
  const response = await postData(ORDERS_URL, data, token);
  console.log(response);
};

const removeOneProduct = async () => {};

const removeAllOfOneProduct = async () => {};

const clearCart = async () => {};
