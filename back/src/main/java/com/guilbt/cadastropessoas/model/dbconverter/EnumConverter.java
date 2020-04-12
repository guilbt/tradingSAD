package com.guilbt.cadastropessoas.model.dbconverter;

import com.guilbt.cadastropessoas.model.EnumBase;

import javax.persistence.AttributeConverter;

public class EnumConverter<V, E extends EnumBase<V>> implements AttributeConverter<E, V> {
    private Class<E> claz;

    public EnumConverter(Class<E> claz) {
        this.claz = claz;
    }

    public V convertToDatabaseColumn(E value) {
        if(value==null) return null;
        return value.getValue();
    }

    public E convertToEntityAttribute(V value) {
        return EnumBase.getEnumFromValue(claz, value);
    }
}