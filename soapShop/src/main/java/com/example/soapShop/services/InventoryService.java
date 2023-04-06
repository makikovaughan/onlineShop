package com.example.soapShop.services;

import java.util.List;

import com.example.soapShop.dtos.InventoryDto;
import com.example.soapShop.dtos.InventoryRequestDto;

public interface InventoryService {

	List<InventoryDto> getAllInventories();

	List<InventoryDto> updateInventory(Long id, InventoryRequestDto inventoryRequestDto);

	InventoryDto createNewItem(InventoryRequestDto inventoryRequestDto);

	List<InventoryDto> deleteItem(Long id);


}
