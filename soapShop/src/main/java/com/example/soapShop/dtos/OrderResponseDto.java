package com.example.soapShop.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class OrderResponseDto {
	
	private Long id;
	private String orderStatus;
	private String username;

}
