package com.guilbt.cadastropessoas.util;


import br.com.caelum.stella.validation.CPFValidator;
import br.com.caelum.stella.validation.InvalidStateException;
import com.guilbt.cadastropessoas.controller.exceptions.PreConditionException;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class PreConditions {

    public static <T extends Object> void isNull(T value, String parameterName) {
        if(value != null) {
            throw new PreConditionException(
                parameterName,
                String.format(
                        "%s deveria ser nulo", parameterName
                )
            );
        }
    }

    public static <T extends Object> void notNull(T value, String parameterName) {
        if(value == null) {
            throw new PreConditionException(
                parameterName,
                String.format(
                    "%s não pode ser nulo", parameterName
                )
            );
        }
    }

    public static void validEmail(String email) {
        notNull(email, "e-mail");
        if(!email.matches("^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")) {
            throw new PreConditionException(
                "email",
                String.format(
                    "%s não é um e-mail valido", email
                )
            );
        }
    }


    public static void validDate(String date) {
        notNull(date, "data");
        DateFormat brDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        brDateFormat.setLenient(false);
        try {
            brDateFormat.parse(date);
        } catch (ParseException e) {
            throw new PreConditionException(
                "data",
                String.format(
                    "%s não é uma data valida", date
                )
            );
        }
    }

    private static final CPFValidator cpfValidator = new CPFValidator(true);

    public static void validCPF(String cpf) {
        notNull(cpf, "cpf");
        try {
            cpfValidator.assertValid(cpf);
        } catch (InvalidStateException ex) {
            throw new PreConditionException(
                "cpf",
                String.format("CPF %s é inválido", cpf)
            );
        }
    }
}
