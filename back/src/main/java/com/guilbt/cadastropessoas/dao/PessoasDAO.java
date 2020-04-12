package com.guilbt.cadastropessoas.dao;

import com.guilbt.cadastropessoas.model.Pessoa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository("PessoasDAO")
@Transactional(readOnly = true)
public class PessoasDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional(readOnly = false)
    public void persist(Pessoa pessoa) {
        entityManager.persist(pessoa);
    }
}
