package com.example.JohnCouponPart2.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({CompanyException.class, CouponException.class, CustomerException.class})
    public ResponseEntity<String> handleNotFoundException(Exception x) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(x.getMessage());
    }
}

