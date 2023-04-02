import React from "react";
import { useRecoilState } from "recoil";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";

import { inventoryState } from "../globalstate";
import InventoryList from "../Components/InventoryList";

const Inventory = () => {
  const [inventories, setInventories] = useRecoilState(inventoryState);

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

  return (
    <div>
      <NavBar />
      <InventoryList />
    </div>
  );
};

export default Inventory;
