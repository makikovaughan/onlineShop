package com.example.soapShop.services;

import java.util.List;

import com.example.soapShop.dtos.OrderRequestDto;
import com.example.soapShop.dtos.OrderResponseDto;

public interface OrderService {

	List<OrderResponseDto> createOrder(String username, List<OrderRequestDto> orderRequestDtos);

}
