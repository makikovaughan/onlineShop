package com.example.soapShop.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.example.soapShop.dtos.UserResponseDto;
import com.example.soapShop.entities.User;

@Mapper(componentModel = "spring", uses = { CredentialsMapper.class, ProfileMapper.class })
public interface UserMapper {

	@Mapping(target = "username", source = "credentials.username")
	UserResponseDto entityToUserResponseDto(User user);

}
