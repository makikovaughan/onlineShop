package com.example.soapShop.dtos;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class UserRequestDto {

	private Boolean isAdmin;
	private CredentialsDto credentials;
	private ProfileDto profile;
}
