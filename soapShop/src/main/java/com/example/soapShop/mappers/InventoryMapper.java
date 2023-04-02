package com.example.soapShop.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.example.soapShop.dtos.InventoryDto;
import com.example.soapShop.dtos.InventoryRequestDto;
import com.example.soapShop.entities.Inventory;

@Mapper(componentModel = "spring")
public interface InventoryMapper {

	public List<InventoryDto> entitiesToDtos(List<Inventory> findAll);

	public Inventory inventoryRequestDtoToEntity(InventoryRequestDto inventoryRequestDto);

	public InventoryDto entityToDto(Inventory saveAndFlush);


}
