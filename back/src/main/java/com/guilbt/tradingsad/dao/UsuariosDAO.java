package com.guilbt.tradingsad.dao;

import com.guilbt.tradingsad.model.Usuario;
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

    public Usuario getByEmail(String email) {
        return entityManager.createQuery(
                "SELECT usr from Usuario usr where usr.email = :email",
                Usuario.class
        ).setParameter("email", email)
                .getSingleResult();
    }

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

    @Transactional
    public void merge(Usuario usuario) {
        this.entityManager.merge(usuario);
    }
}
