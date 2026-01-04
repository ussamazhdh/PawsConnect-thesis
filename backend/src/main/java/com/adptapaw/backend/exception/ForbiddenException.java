package com.adptapaw.backend.exception;

import org.springframework.http.HttpStatus;

/**
 * Exception for forbidden access errors (403)
 */
public class ForbiddenException extends AdoptapawAPIExceptions {
    public ForbiddenException(String message) {
        super(HttpStatus.FORBIDDEN, message);
    }
}

