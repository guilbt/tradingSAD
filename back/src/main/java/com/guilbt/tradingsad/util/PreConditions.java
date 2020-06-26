package com.guilbt.tradingsad.util;


import com.guilbt.tradingsad.controller.exceptions.PreConditionException;

import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class PreConditions {

    public static <T extends Object> void isNull(T value, String parameterName) {
        if (value != null) {
            throw new PreConditionException(
                    parameterName,
                    String.format(
                            "%s deveria ser nulo", parameterName
                    )
            );
        }
    }

    public static <T extends Object> void notNull(T value, String parameterName) {
        if (value == null) {
            throw new PreConditionException(
                    parameterName,
                    String.format(
                            "%s não pode ser nulo", parameterName
                    )
            );
        }
    }

    public static void positiveNotNullValue(BigDecimal value, String parameterName) {
        PreConditions.notNull(value, parameterName);
        if (value.compareTo(BigDecimal.ZERO) <= 0) {
            throw new PreConditionException(
                    parameterName,
                    "Tem que ser positivo"
            );
        }
    }

    public static void validEmail(String email) {
        notNull(email, "e-mail");
        if (!email.matches("^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")) {
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
                            "%s não é uma data valida, formato esperado: yyyy-MM-dd", date
                    )
            );
        }
    }
}
