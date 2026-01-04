package com.adptapaw.backend.exception;

import org.springframework.http.HttpStatus;

/**
 * Exception for bad request errors (400)
 */
public class BadRequestException extends AdoptapawAPIExceptions {
    public BadRequestException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}

