package com.example.soapShop.services.impl;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.soapShop.dtos.CredentialsDto;
import com.example.soapShop.dtos.UserRequestDto;
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

	// Find a user by username
	private User findUserByUsername(String username) {
		Optional<User> optionalUser = userRepository.findUserByCredentialsUsernameAndIsDeletedFalse(username);
		if (optionalUser.isEmpty()) {
			throw new NotFoundException("No user found with username: " + username);
		}
		return optionalUser.get();
	}

	// Find a user by id
	private User findUserById(Long id) {

		Optional<User> optionalUser = userRepository.findUserByIdAndIsDeletedFalse(id);
		if (optionalUser.isEmpty()) {
			throw new NotFoundException("No user found with the information");
		}
		return optionalUser.get();
	}

	// Check duplicate user
	private boolean checkDuplicateUser(UserRequestDto userRequestDto) {
		Optional<User> optionalUser = userRepository
				.findUserByCredentialsUsername(userRequestDto.getCredentials().getUsername());
		if (!optionalUser.isEmpty()) {
			return true;
		}
		optionalUser = userRepository.findUserByProfileEmail(userRequestDto.getProfile().getEmail());
		if (!optionalUser.isEmpty()) {
			return true;
		}
		return false;
	}

	// Check duplicate username
	private boolean checkDuplicateUserName(String username) {
		Optional<User> optionalUser = userRepository.findUserByCredentialsUsername(username);
		if (!optionalUser.isEmpty()) {
			return true;
		}
		return false;
	}

	// Check duplicate email
	private boolean checkDuplicateEmail(String email) {
		Optional<User> optionalUser = userRepository.findUserByProfileEmail(email);
		if (!optionalUser.isEmpty()) {
			return true;
		}
		return false;
	}

	// Update user
	private User updateUser(User user, UserRequestDto userRequestDto) {
		if (!userRequestDto.getCredentials().getUsername().equals(user.getCredentials().getUsername())) {
			if (!checkDuplicateUserName(userRequestDto.getCredentials().getUsername())) {
				user.getCredentials().setUsername(userRequestDto.getCredentials().getUsername());
			} else {
				throw new UnauthorizedException("Username is already in use. Please select another one");
			}
		}
		if (!userRequestDto.getProfile().getEmail().equals(user.getProfile().getEmail())) {
			if (!checkDuplicateEmail(userRequestDto.getProfile().getEmail())) {
				user.getProfile().setEmail(userRequestDto.getProfile().getEmail());
			} else {
				throw new UnauthorizedException("Email is already in use. Please select another one");
			}
		}
		if (!userRequestDto.getIsAdmin() == user.getIsAdmin()) {
			user.setIsAdmin(userRequestDto.getIsAdmin());
		}
		if (!userRequestDto.getProfile().getFirstName().equals(user.getProfile().getFirstName())) {
			user.getProfile().setFirstName(userRequestDto.getProfile().getFirstName());
		}
		if (!userRequestDto.getProfile().getLastName().equals(user.getProfile().getLastName())) {
			user.getProfile().setLastName(userRequestDto.getProfile().getLastName());
		}
		if (!userRequestDto.getProfile().getPhone().equals(user.getProfile().getPhone())) {
			user.getProfile().setPhone(userRequestDto.getProfile().getPhone());
		}
		if (!userRequestDto.getProfile().getCity().equals(user.getProfile().getCity())) {
			user.getProfile().setCity(userRequestDto.getProfile().getCity());
		}
		if (!userRequestDto.getProfile().getState().equals(user.getProfile().getState())) {
			user.getProfile().setState(userRequestDto.getProfile().getState());
		}
		if (!userRequestDto.getProfile().getZipcode().equals(user.getProfile().getZipcode())) {
			user.getProfile().setZipcode(userRequestDto.getProfile().getZipcode());
		}
		return user;
	}

	@Override
	public UserResponseDto getUserVerification(CredentialsDto credentialsDto) {
		User user = getUser(credentialsDto);
		System.out.println(user);
		return userMapper.entityToUserResponseDto(user);
	}

	@Override
	public UserResponseDto createUser(UserRequestDto userRequestDto) {
		if (checkDuplicateUser(userRequestDto)) {
			throw new UnauthorizedException("Username or email are already used. Please select another one");
		}
		User user = userMapper.UserRequestDtoToEntity(userRequestDto);
		return userMapper.entityToUserResponseDto(userRepository.saveAndFlush(user));
	}

	@Override
	public UserResponseDto getUserByUsername(String username) {

		User user = findUserByUsername(username);

		return userMapper.entityToUserResponseDto(user);
	}

	@Override
	public UserResponseDto updateUserById(Long id, UserRequestDto userRequestDto) {
		User user = findUserById(id);
		User userToUpdate = updateUser(user, userRequestDto);
		return userMapper.entityToUserResponseDto(userRepository.saveAndFlush(userToUpdate));
	}

}
