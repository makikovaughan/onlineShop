package com.example.soapShop.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.soapShop.entities.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {


	Order findOrderStatusByCustomerAndIsDeletedFalse(String username);

	Order findAllByCustomerAndIsDeletedFalse(String username);



}
