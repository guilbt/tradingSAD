package com.guilbt.tradingsad.model;

public interface EnumBase<V> {
    static <E extends EnumBase, V> E getEnumFromValue(Class<E> type, V value) {
        if (value == null) {
            return null;
        }
        for (E enumValue : type.getEnumConstants()) {
            if (enumValue.getValue().equals(value)) {
                return enumValue;
            }
        }
        return null;
    }

    V getValue();
}
