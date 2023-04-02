package com.example.soapShop.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.soapShop.dtos.OrderRequestDto;
import com.example.soapShop.dtos.OrderResponseDto;
import com.example.soapShop.entities.Inventory;
import com.example.soapShop.entities.Order;
import com.example.soapShop.entities.User;
import com.example.soapShop.exceptions.BadRequestException;
import com.example.soapShop.exceptions.NotFoundException;
import com.example.soapShop.mappers.OrderMapper;
import com.example.soapShop.repositories.InventoryRepository;
import com.example.soapShop.repositories.OrderRepository;
import com.example.soapShop.repositories.UserRepository;
import com.example.soapShop.services.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

	private final OrderRepository orderRepository;
	private final UserRepository userRepository;
	private final InventoryRepository inventoryRepository;
	private final OrderMapper orderMapper;

	// Check user info from username
	private User getUser(String username) {
		Optional<User> optionalUser = userRepository.findUserByCredentialsUsernameAndIsDeletedFalse(username);

		if (optionalUser.isEmpty()) {
			throw new NotFoundException("No user found with username: " + username);
		}
		return optionalUser.get();
	}

	// Get Inventory info
	private Inventory getInventory(Long id) {
		Optional<Inventory> optionalInventory = inventoryRepository.findInventoryByIdAndIsDeletedFalse(id);
		if (optionalInventory.isEmpty()) {
			throw new NotFoundException("No inventory found with this inventory id: " + id);
		}
		return optionalInventory.get();
	}

	// Check order verification and add orders
	private void addOrders(List<Order> orders, User user) {

		for (Order order : orders) {
			Inventory inventory = getInventory(order.getItem().getId());
			if ((order.getQty() == null) || (inventory.getName() == null) || (inventory.getPrice() == null)) {
				throw new BadRequestException("Order information is missing.");
			}
			order.setItem(inventory);
			order.setCustomer(user);
		}
	}

	@Override
	public List<OrderResponseDto> createOrder(String username, List<OrderRequestDto> orderRequestDtos) {
		User user = getUser(username);
		List<Order> ordersToSave = orderMapper.orderRequestDtosToEntities(orderRequestDtos);
		addOrders(ordersToSave, user);
		List<Order> orders = orderRepository.saveAllAndFlush(ordersToSave);

		return orderMapper.entitiesToOrderResponseDtos(orders);

	}

}
