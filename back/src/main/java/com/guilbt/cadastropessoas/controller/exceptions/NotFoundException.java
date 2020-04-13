package com.guilbt.cadastropessoas.controller.exceptions;

public class NotFoundException extends CustomRuntimeException{
    public NotFoundException(String message) {
        super(message);
    }
}
