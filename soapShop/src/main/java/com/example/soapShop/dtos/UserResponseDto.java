package com.example.soapShop.dtos;

import java.sql.Timestamp;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserResponseDto {
	
	private Long id;
	private String username;
	private Boolean isAdmin;
	private ProfileDto profile;
	private Timestamp created;

}
