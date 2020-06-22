package com.guilbt.tradingsad.controller.exceptions;

public class ConflictException extends CustomRuntimeException{
    public ConflictException(String message) {
        super(message);
    }
}
