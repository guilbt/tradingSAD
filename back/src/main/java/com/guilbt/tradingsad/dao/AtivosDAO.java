package com.guilbt.tradingsad.dao;

import com.guilbt.tradingsad.model.Ativo;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.math.BigDecimal;
import java.util.List;

@Repository("AtivosDAO")
@Transactional(readOnly = true)
public class AtivosDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public Ativo recuperar(Long ativoId) {
        return entityManager.createQuery("" +
                "SELECT a FROM Ativo a" +
                " where id = :ativoId ",
                Ativo.class
        ).setParameter("ativoId", ativoId)
        .getSingleResult();
    }

    public List<Ativo> recuperarAtivosPorValor(BigDecimal valor) {
        return entityManager.createQuery("" +
            "SELECT a" +
            "    FROM Ativo a" +
            "    order by abs(valor_indicado - :valor) asc",
            Ativo.class
        ).setParameter("valor", valor)
        .setMaxResults(3)
        .getResultList();
    }
}
