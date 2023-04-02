package com.example.soapShop.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class NotFoundException extends RuntimeException {

    private static final long serialVersionUID = -480427849166150746L;

    private String message;
}
