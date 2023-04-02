package com.example.soapShop.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class UnauthorizedException extends RuntimeException {

    private static final long serialVersionUID = -3766412180747480588L;

    private String message;
}

