package com.example.soapShop.entities;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
public class Inventory {

	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(nullable = false)
	private Integer qty;

	@Column(nullable = false)
	private Double price;

	@Column(nullable = false)
	private String picture;

	@Column(nullable = false)
	@UpdateTimestamp
	private Timestamp updatedTime;

	private boolean isDeleted = false;

	@OneToMany(mappedBy = "item")
	private List<Order> orders;

//	@ManyToMany
//	@JoinTable(name = "item_Order", joinColumns = @JoinColumn(name = "order_id"), inverseJoinColumns = @JoinColumn(name = "imnventory_id"))
//	private List<Order> items = new ArrayList<>();
}
