package com.example.soapShop.services;

import com.example.soapShop.dtos.CredentialsDto;
import com.example.soapShop.dtos.UserRequestDto;
import com.example.soapShop.dtos.UserResponseDto;

public interface UserService {

	UserResponseDto getUserVerification(CredentialsDto credentialsDto);

	UserResponseDto createUser(UserRequestDto userRequestDto);

}
