export const createOrder = async (newOrder, username) => {
  try {
    const response = await fetch(`http://localhost:8080/order/${username}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });
    console.log(response);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    throw new Error("Request failed.");
  } catch (error) {
    console.log(error);
  }
};

export const getLogin = async (credentials) => {
  try {
    const response = await fetch(`http://localhost:8080/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    throw new Error("Invalid username or password");
  } catch (error) {
    return error;
  }
};

export const updateInventory = async (updateOrder) => {
  try {
    const response = await fetch(
      `http://localhost:8080/inventory/${updateOrder.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateOrder),
      }
    );
    console.log(response);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    throw new Error("Request failed.");
  } catch (error) {
    console.log(error);
  }
};

export const createItem = async (newItem) => {
  try {
    const response = await fetch(`http://localhost:8080/inventory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });
    console.log(response);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    throw new Error("Request failed.");
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await fetch(`http://localhost:8080/inventory/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    throw new Error("Request failed.");
  } catch (error) {
    console.log(error);
  }
};
