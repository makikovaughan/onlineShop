package com.example.soapShop.entities;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name = "order_table")
public class Order {

	@Id
	@GeneratedValue
	private Long id;

	@ManyToOne
	private User customer;

	@ManyToOne
	private Inventory item;

//	@ManyToMany(mappedBy = "items", cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
//	private List<Inventory> items;

//	@Column(nullable = false)
//	private String name;

	@Column(nullable = false)
	private Integer qty;

//	@Column(nullable = false)
//	private Double price;

	@Column(nullable = false)
	private String orderStatus = "Ordered";

	@Column(nullable = false)
	@CreationTimestamp
	private Timestamp orderedTime;

	@Column(nullable = false)
	private boolean isDeleted = false;

}
