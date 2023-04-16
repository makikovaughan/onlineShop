package com.example.soapShop.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

	//Check if user's authentiation is correct. If it is correct, the user can log in.
	@PostMapping
	@CrossOrigin(origins = "*")
	UserResponseDto getUserVerification(@RequestBody CredentialsDto credentialsDto) {
		return userService.getUserVerification(credentialsDto);
	}
	
	//Create a new user by a new user
	@PostMapping("/new-user")
	@CrossOrigin(origins = "*")
	UserResponseDto createUser(@RequestBody UserRequestDto userRequestDto) {
		return userService.createUser(userRequestDto);
	}
	
	//Get the user information by user id
	@GetMapping("/{username}")
	@CrossOrigin(origins = "*")
	UserResponseDto getUserByUserName(@PathVariable String username) {
		return userService.getUserByUsername(username);
	}
	
	@PatchMapping("/{id}")
	@CrossOrigin(origins = "*")
	UserResponseDto updateUserById(@PathVariable Long id, @RequestBody UserRequestDto userRequestDto) {
		return userService.updateUserById(id, userRequestDto);
	}
	

}
