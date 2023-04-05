package com.example.soapShop.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.soapShop.entities.Inventory;


@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long>{

	List<Inventory> findAllByIsDeletedFalse();

	Optional<Inventory> findInventoryByIdAndIsDeletedFalse(Long id);

	Optional<Inventory> getByIdAndIsDeletedFalse(Long id);


	List<Inventory> findAllByIsDeletedFalseOrderByIdAsc();

	List<Inventory> findByIsDeletedFalseOrderByIdAsc();

}
