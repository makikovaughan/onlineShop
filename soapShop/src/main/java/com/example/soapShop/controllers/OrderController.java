package com.example.soapShop.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.soapShop.dtos.OrderRequestDto;
import com.example.soapShop.dtos.OrderResponseDto;
import com.example.soapShop.services.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/order")
@RequiredArgsConstructor
@CrossOrigin
public class OrderController {

	private final OrderService orderService;

	@PostMapping("/{username}")
	@ResponseStatus(HttpStatus.CREATED)
	@CrossOrigin(origins = "*")
	List<OrderResponseDto> createOrder(@PathVariable String username, @RequestBody List<OrderRequestDto> orderRequestDtos) {
		return orderService.createOrder(username, orderRequestDtos);
	}

}
