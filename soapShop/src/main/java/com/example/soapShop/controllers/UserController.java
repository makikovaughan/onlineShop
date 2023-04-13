package com.example.soapShop.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.soapShop.dtos.CredentialsDto;
import com.example.soapShop.dtos.UserRequestDto;
import com.example.soapShop.dtos.UserResponseDto;
import com.example.soapShop.services.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

	private final UserService userService;

	@PostMapping
	@CrossOrigin(origins = "*")
	UserResponseDto getUserVerification(@RequestBody CredentialsDto credentialsDto) {
		return userService.getUserVerification(credentialsDto);
	}
	
	@PostMapping("/new-user")
	@CrossOrigin(origins = "*")
	UserResponseDto createUser(@RequestBody UserRequestDto userRequestDto) {
		return userService.createUser(userRequestDto);
	}

}
