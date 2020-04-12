package com.guilbt.cadastropessoas.dao;

import com.guilbt.cadastropessoas.model.Pessoa;
import org.hibernate.query.NativeQuery;
import org.hibernate.type.LongType;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository("UsuariosDAO")
@Transactional(readOnly = true)
public class UsuariosDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public Long getIdByEmail(String email) {
        return (Long) entityManager.createNativeQuery(
        "SELECT USUARIO_ID as id" +
            " FROM TESTE.USUARIO" +
            " WHERE EMAIL = :email ;"
        ).setParameter("email", email)
        .unwrap(NativeQuery.class)
        .addScalar("id", LongType.INSTANCE)
        .getSingleResult();
    }
}
