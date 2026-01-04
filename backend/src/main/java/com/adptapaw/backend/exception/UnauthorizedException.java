package com.adptapaw.backend.exception;

import org.springframework.http.HttpStatus;

/**
 * Exception for unauthorized access errors (401)
 */
public class UnauthorizedException extends AdoptapawAPIExceptions {
    public UnauthorizedException(String message) {
        super(HttpStatus.UNAUTHORIZED, message);
    }
}

