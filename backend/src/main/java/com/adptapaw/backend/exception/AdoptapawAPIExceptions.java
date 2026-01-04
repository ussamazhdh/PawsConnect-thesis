package com.adptapaw.backend.exception;

import org.springframework.http.HttpStatus;

/**
 * Base exception class for all custom API exceptions
 */
public class AdoptapawAPIExceptions extends RuntimeException {
    private HttpStatus status;

    public AdoptapawAPIExceptions(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
