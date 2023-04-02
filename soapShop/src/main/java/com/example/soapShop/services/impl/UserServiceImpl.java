package com.example.soapShop.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.soapShop.dtos.CredentialsDto;
import com.example.soapShop.dtos.UserResponseDto;
import com.example.soapShop.entities.User;
import com.example.soapShop.exceptions.NotFoundException;
import com.example.soapShop.exceptions.UnauthorizedException;
import com.example.soapShop.mappers.UserMapper;
import com.example.soapShop.repositories.UserRepository;
import com.example.soapShop.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final UserMapper userMapper;

	// Check user info from username
	private User getUser(CredentialsDto credentialsDto) {
		Optional<User> optionalUser = userRepository
				.findUserByCredentialsUsernameAndIsDeletedFalse(credentialsDto.getUsername());

		if (optionalUser.isEmpty()) {
			throw new NotFoundException("No user found with username: " + credentialsDto.getUsername());
		}
		if (!(optionalUser.get().getCredentials().getPassword().equals(credentialsDto.getPassword()))) {
			throw new UnauthorizedException("Password is not correct.");
		}
		return optionalUser.get();
	}

	@Override
	public UserResponseDto getUserVerification(CredentialsDto credentialsDto) {
		User user = getUser(credentialsDto);
		System.out.println(user);
		return userMapper.entityToUserResponseDto(user);
	}

}
