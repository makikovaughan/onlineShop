package com.example.soapShop.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class InventoryRequestDto {
	
	private String name;
	private Integer qty;
	private Double price;
	private String picture;

}
