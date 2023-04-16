package com.example.soapShop.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.soapShop.dtos.InventoryDto;
import com.example.soapShop.dtos.InventoryRequestDto;
import com.example.soapShop.services.InventoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/inventory")
@RequiredArgsConstructor
@CrossOrigin
public class InventoryController {

	private final InventoryService inventoryService;

	// Get all inventories in the DB
	@GetMapping
	@CrossOrigin(origins = "*")
	List<InventoryDto> getAllInventories() {
		return inventoryService.getAllInventories();
	}

	//Update inventory by product id
	@PatchMapping({ "/{id}" })
	@CrossOrigin(origins = "*")
	List<InventoryDto> updateInventory(@PathVariable Long id, @RequestBody InventoryRequestDto inventoryRequestDto) {
		return inventoryService.updateInventory(id, inventoryRequestDto);
	}
	
	//Create a new inventory
	@PostMapping
	@CrossOrigin(origins = "*")
	InventoryDto createNewItem(@RequestBody InventoryRequestDto inventoryRequestDto) {
		return inventoryService.createNewItem(inventoryRequestDto);
	}
	
	//Delete the inventory by id
	@DeleteMapping("/{id}")
	@CrossOrigin(origins = "*")
	List<InventoryDto> deleteItem(@PathVariable Long id) {
		return inventoryService.deleteItem(id);
	}

}
