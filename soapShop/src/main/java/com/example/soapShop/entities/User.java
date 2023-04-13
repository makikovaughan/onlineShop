package com.example.soapShop.entities;

import java.sql.Timestamp;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import com.example.soapShop.entities.embeddable.Credentials;
import com.example.soapShop.entities.embeddable.Profile;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Data
@Table(name = "user_table")
public class User {

	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	@CreationTimestamp
	private Timestamp created;
	
	@Column(nullable = false)
	private Boolean isAdmin = false;

	@Embedded
	private Credentials credentials;

	@Embedded
	private Profile profile;

	@Column(nullable = false)
	private boolean isDeleted = false;

	@OneToMany(mappedBy = "customer")
	private List<Order> orders;

}
