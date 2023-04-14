import React from "react";
import { useRecoilState } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import NavBar from "../Components/NavBar";
import { inventoryState, userState } from "../globalstate";
import InventoryList from "../Components/InventoryList";
import PageFooter from "../Components/PageFooter";

const Inventory = () => {
  const [inventories, setInventories] = useRecoilState(inventoryState);
  const [user] = useRecoilState(userState);

  useEffect(() => {
    getInventory();
  });

  const getInventory = async () => {
    try {
      const response = await fetch("http://localhost:8080/inventory");
      if (response.ok) {
        const jsonResponse = await response.json();
        setInventories(jsonResponse);
      }
    } catch (e) {
      console.log(e);
    }
  };

  if (!user.isAdmin) {
    return <Navigate replace to="/"></Navigate>;
  } else {
    return (
      <div>
        <NavBar />
        <InventoryList />
        <PageFooter />
      </div>
    );
  }
};

export default Inventory;
