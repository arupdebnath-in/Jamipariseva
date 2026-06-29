package com.example.paymentgateway.exception;

import com.example.paymentgateway.common.ApiResponse;
import com.example.paymentgateway.controller.LocationController;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
@RestControllerAdvice(assignableTypes = LocationController.class)
public class LocationExceptionHandler {

    private static final Map<String, String> HTTP_CODES_MAP = Map.of(
            "400 Bad Request", "Invalid request/body format",
            "500 Internal Server Error", "Generic server error"
    );

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiResponse<Void>> handleBadRequest(BadRequestException ex) {
        return ResponseEntity.badRequest().body(ApiResponse.fail(ex.getMessage(), HTTP_CODES_MAP));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Void>> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .findFirst()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .orElse("Validation failed");
        return ResponseEntity.badRequest().body(ApiResponse.fail(message, HTTP_CODES_MAP));
    }

    @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<Void>> handleMessageNotReadable(
            org.springframework.http.converter.HttpMessageNotReadableException ex) {
        String causeMessage = ex.getMostSpecificCause() != null
                ? ex.getMostSpecificCause().getMessage()
                : ex.getMessage();
        return ResponseEntity.badRequest()
                .body(ApiResponse.fail("Malformed JSON or invalid request format: " + causeMessage, HTTP_CODES_MAP));
    }

    @ExceptionHandler(jakarta.validation.ConstraintViolationException.class)
    public ResponseEntity<ApiResponse<Void>> handleConstraintViolation(
            jakarta.validation.ConstraintViolationException ex) {
        String message = ex.getConstraintViolations().stream()
                .findFirst()
                .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
                .orElse("Validation failed");
        return ResponseEntity.badRequest().body(ApiResponse.fail(message, HTTP_CODES_MAP));
    }

    @ExceptionHandler(org.springframework.web.bind.MissingServletRequestParameterException.class)
    public ResponseEntity<ApiResponse<Void>> handleMissingParams(
            org.springframework.web.bind.MissingServletRequestParameterException ex) {
        return ResponseEntity.badRequest().body(ApiResponse.fail(ex.getMessage(), HTTP_CODES_MAP));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Void>> handleGeneric(Exception ex) {
        log.error("Unexpected location API error", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.fail("Internal server error. Please try again later."));
    }
}
