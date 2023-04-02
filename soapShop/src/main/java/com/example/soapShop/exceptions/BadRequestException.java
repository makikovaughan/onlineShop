package com.example.soapShop.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class BadRequestException extends RuntimeException {

    private static final long serialVersionUID = -9067266153115146942L;

    private String message;
}
