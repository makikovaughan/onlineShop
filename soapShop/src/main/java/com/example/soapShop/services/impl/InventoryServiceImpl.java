package com.example.soapShop.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.soapShop.dtos.InventoryDto;
import com.example.soapShop.dtos.InventoryRequestDto;
import com.example.soapShop.entities.Inventory;
import com.example.soapShop.exceptions.BadRequestException;
import com.example.soapShop.exceptions.NotFoundException;
import com.example.soapShop.mappers.InventoryMapper;
import com.example.soapShop.repositories.InventoryRepository;
import com.example.soapShop.services.InventoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

	private final InventoryRepository inventoryRepository;
	private final InventoryMapper inventoryMapper;

	// Get inventory by id
	private Inventory updateInventory(Long id) {
		Optional<Inventory> inventory = inventoryRepository.getByIdAndIsDeletedFalse(id);

		if (inventory.isEmpty()) {
			throw new NotFoundException("No inventory found with id: " + id);
		}
		return inventory.get();
	}

	// Validate update data
	private void validateInventory(InventoryRequestDto inventoryRequestDto) {
		if ((inventoryRequestDto.getName() == null) || (inventoryRequestDto.getPicture() == null)
				|| (inventoryRequestDto.getPrice() == null) || (inventoryRequestDto.getQty() == null)) {
			throw new BadRequestException("All fields are required");
		}

	}

	// Get all inventories from the DB
	@Override
	public List<InventoryDto> getAllInventories() {
		return inventoryMapper.entitiesToDtos(inventoryRepository.findAllByIsDeletedFalse());
	}

	// Update inventory by id
	@Override
	public List<InventoryDto> updateInventory(Long id, InventoryRequestDto inventoryRequestDto) {
		updateInventory(id);
		validateInventory(inventoryRequestDto);
		Inventory inventory = inventoryMapper.inventoryRequestDtoToEntity(inventoryRequestDto);
		inventory.setId(id);
		inventoryRepository.saveAndFlush(inventory);
		return inventoryMapper.entitiesToDtos(inventoryRepository.findByIsDeletedFalseOrderByIdAsc());
	}

}
