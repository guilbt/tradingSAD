package com.guilbt.tradingsad.controller.exceptions;

public class UnavailableException extends CustomRuntimeException {
    public UnavailableException(String message) {
        super(message);
    }
}