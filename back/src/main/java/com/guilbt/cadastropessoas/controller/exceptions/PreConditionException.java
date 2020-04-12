package com.guilbt.cadastropessoas.controller.exceptions;

public class PreConditionException extends CustomRuntimeException{
    private String campo;

//    public PreConditionException(String message) {
//        super(message);
//    }

    public PreConditionException(String campo, String message) {
        super(message);
        this.campo = campo;
    }

    public String getCampo() {
        return this.campo;
    }
}
