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
    const text = await response.json();
    throw new Error(text.message);
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
    const text = await response.json();
    throw new Error(text.message);
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
    const text = await response.json();
    throw new Error(text.message);
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
    const text = await response.json();
    throw new Error(text.message);
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
    const text = await response.json();
    throw new Error(text.message);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user) => {
  try {
    const newUser = {
      isAdmin: user.isAdmin,
      credentials: {
        username: user.username,
        password: user.password,
      },
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        street: user.street,
        city: user.city,
        state: user.state,
        zipcode: user.zipcode,
      },
    };

    const response = await fetch(`http://localhost:8080/user/new-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    console.log(response);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    const text = await response.json();
    throw new Error(text.message);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getUserByUsername = async (username) => {
  try {
    const response = await fetch(`http://localhost:8080/user/${username}`);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    const text = await response.json();
    throw new Error(text.message);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateUserProfile = async (id, user) => {
  try {
    const updateUser = {
      isAdmin: user.isAdmin,
      credentials: {
        username: user.username,
      },
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        street: user.street,
        city: user.city,
        state: user.state,
        zipcode: user.zipcode,
      },
    };

    const response = await fetch(`http://localhost:8080/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateUser),
    });
    console.log(response);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
    const text = await response.json();
    throw new Error(text.message);
  } catch (error) {
    console.log(error);
    return error;
  }
};
