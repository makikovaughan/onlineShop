package com.example.soapShop.controllers.advice;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.example.soapShop.dtos.ErrorDto;
import com.example.soapShop.exceptions.BadRequestException;
import com.example.soapShop.exceptions.NotFoundException;
import com.example.soapShop.exceptions.UnauthorizedException;

import jakarta.servlet.http.HttpServletRequest;

//@ControllerAdvice(basePackages = { "com.example.soapShop.controllers" })
@ComponentScan(basePackages = {"com.example.soapShop.controllers" })
@ResponseBody
public class ControllerAdvice {

	@ResponseStatus(HttpStatus.UNAUTHORIZED)
	@ExceptionHandler(UnauthorizedException.class)
	public ErrorDto handleBadRequestException(HttpServletRequest request, UnauthorizedException unauthorizedException) {
		return new ErrorDto(unauthorizedException.getMessage());
	}

	@ResponseStatus(HttpStatus.BAD_REQUEST)
	@ExceptionHandler(BadRequestException.class)
	public ErrorDto handleBadRequestException(HttpServletRequest request, BadRequestException badRequestException) {
		return new ErrorDto(badRequestException.getMessage());
	}

	@ResponseStatus(HttpStatus.NOT_FOUND)
	@ExceptionHandler(NotFoundException.class)
	public ErrorDto handleBadRequestException(HttpServletRequest request, NotFoundException notFoundException) {
		return new ErrorDto(notFoundException.getMessage());
	}

}
