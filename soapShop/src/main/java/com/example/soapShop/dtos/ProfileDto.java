package com.example.soapShop.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ProfileDto {
	
	private String email;
	private String firstName;
	private String lastName;
	private String phone;
	private String street;
	private String city;
	private String state;
	private int zipcode;
}
