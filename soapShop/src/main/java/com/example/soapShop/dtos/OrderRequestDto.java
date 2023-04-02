package com.example.soapShop.dtos;

import com.example.soapShop.entities.Inventory;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class OrderRequestDto {

	private Integer qty;
	private Inventory item;

}
