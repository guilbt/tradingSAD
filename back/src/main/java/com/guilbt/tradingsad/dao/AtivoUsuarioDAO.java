package com.guilbt.tradingsad.dao;

import com.guilbt.tradingsad.model.UsuarioAtivo;
import com.guilbt.tradingsad.model.dto.AtivoInvestidoDTO;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.BigDecimalType;
import org.hibernate.type.StringType;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository("AtivoUsuarioDAO")
@Transactional(readOnly = true)
public class AtivoUsuarioDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void persist(UsuarioAtivo usuarioAtivo) {
        entityManager.persist(usuarioAtivo);
    };

    @Transactional
    public void merge(UsuarioAtivo usuarioAtivo) {
        entityManager.merge(usuarioAtivo);
    };

    public UsuarioAtivo recuperar(Long usuarioId, Long ativoId) {
        try {
            return entityManager.createQuery("" +
                        "SELECT usAt FROM UsuarioAtivo usAt" +
                        " where usAt.usuarioId = :usuarioId and usAt.ativoId = :ativoId ",
                    UsuarioAtivo.class
            ).setParameter("usuarioId", usuarioId)
            .setParameter("ativoId", ativoId)
            .getSingleResult();
        } catch (NoResultException ex) {
            return null;
        }
    }

    public List<AtivoInvestidoDTO> getAtivosInvestidosByUsuario(Long usuarioId) {
        return entityManager.createNativeQuery("" +
                "SELECT ativo.nome, ativo.simbolo, usuario_ativo.quantidade" +
                "    FROM TESTE.ATIVO" +
                "    JOIN TESTE.USUARIO_ATIVO ON ativo.ativo_id = usuario_ativo.ativo_id" +
                "    WHERE USUARIO_ID = :usuarioId ;"
        ).setParameter("usuarioId", usuarioId)
        .unwrap(NativeQuery.class)
        .addScalar("nome", StringType.INSTANCE)
        .addScalar("simbolo", StringType.INSTANCE)
        .addScalar("quantidade", BigDecimalType.INSTANCE)
        .setResultTransformer(Transformers.aliasToBean(AtivoInvestidoDTO.class))
        .list();
    }
}
