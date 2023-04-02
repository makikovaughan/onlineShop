package com.example.soapShop.dtos;

import java.sql.Timestamp;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class InventoryDto {

	private Long id;
	private String name;
	private Integer qty;
	private Double price;
	private String picture;
	private Timestamp updatedTime;

}
