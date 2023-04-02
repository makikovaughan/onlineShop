import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const inventoryState = atom({
  key: "inventoryState",
  default: [
    {
      id: "1",
      name: "Lemon Bar Soap",
      picture: "./images/macadamia-soap-skin-care-treatment.jpg",
      qty: "10",
      price: "2.50",
    },
    {
      id: "2",
      name: "Lavender Bar Soap",
      picture:
        "./images/closeup-shot-handmade-scented-coffee-soap-with-cinnamon-wooden-background.jpg",
      qty: "20",
      price: "2.50",
    },
    {
      id: "3",
      name: "Lemon Liquid Soap",
      picture: "./images/18949.jpg",
      qty: "10",
      price: "0.50",
    },
    {
      id: "4",
      name: "Lavender Liquid Soap",
      picture: "./images/18030490.jpg",
      qty: "25",
      price: "6.50",
    },
  ],
});

export const orderState = atom({
  key: "orderState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: "userState",
  default: {
    id: 0,
    isLoggedIn: false,
    isAdmin: false,
    username: "user123",
    password: "123123",
    email: "hahaha@gmail.com",
    firstName: "Randy",
    lastName: "Vaughan",
    phone: "123-123-1234",
    street: " ",
    city: "Atlanta",
    state: "Georgia",
    zipcode: 30350,
  },
  effects_UNSTABLE: [persistAtom],
});

export const errorState = atom({
  key: "errorState",
  default: {
    isError: false,
    message: "",
  },
});
