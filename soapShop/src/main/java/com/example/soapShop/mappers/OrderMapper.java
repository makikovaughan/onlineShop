package com.example.soapShop.mappers;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.soapShop.dtos.OrderRequestDto;
import com.example.soapShop.dtos.OrderResponseDto;
import com.example.soapShop.entities.Order;

@Mapper(componentModel = "spring", uses = { UserMapper.class, CredentialsMapper.class })
public interface OrderMapper {

	List<Order> dtosToEntities(List<OrderRequestDto> orderRequestDtos);
	
	@Mapping(target = "username", source = "customer.credentials.username")
	OrderResponseDto entityToOrderResponseDto(Order order);

	List<OrderResponseDto> entitiesToOrderResponseDtos(List<Order> orders);
	

	List<Order> orderRequestDtosToEntities(List<OrderRequestDto> orderRequestDtos);

}
