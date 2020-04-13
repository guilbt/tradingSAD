package com.guilbt.cadastropessoas.dao;

import com.guilbt.cadastropessoas.model.Pessoa;
import com.guilbt.cadastropessoas.model.dto.PessoaDTO;
import org.hibernate.query.NativeQuery;
import org.hibernate.transform.Transformers;
import org.hibernate.type.LongType;
import org.hibernate.type.StringType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository("PessoasDAO")
@Transactional(readOnly = true)
public class PessoasDAO {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional(readOnly = false)
    public void persist(Pessoa pessoa) {
        entityManager.persist(pessoa);
    }

    @Transactional(readOnly = false)
    public void merge(Pessoa pessoa) {
        entityManager.merge(pessoa);
    }

    @Transactional(readOnly = true)
    public Pessoa buscarPorId(Long id) {
        try {
            return entityManager.createQuery("" +
                "SELECT p " +
                " FROM Pessoa p" +
                " WHERE id = :id",
                Pessoa.class
            ).setParameter("id", id)
            .getSingleResult();
        } catch (NoResultException ex) {
            return null;
        }
    }

    public List<PessoaDTO> getByUsuarioCadastroId(Long usuarioCadastroId) {
        return entityManager.createNativeQuery("" +
            "select" +
            "   pessoa_id as id, data_nascimento as dataNascimento," +
            "   nome, sexo, email, naturalidade, nacionalidade, cpf, endereco" +
            "  from teste.pessoa " +
            "  where usuario_cadastro_id = :usuarioCadastroId " +
            "     and esta_arquivado = false;"
        ).setParameter("usuarioCadastroId", usuarioCadastroId)
        .unwrap(NativeQuery.class)
        .addScalar("id", LongType.INSTANCE)
        .addScalar("nome", StringType.INSTANCE)
        .addScalar("sexo", StringType.INSTANCE)
        .addScalar("email", StringType.INSTANCE)
        .addScalar("dataNascimento", StringType.INSTANCE)
        .addScalar("naturalidade", StringType.INSTANCE)
        .addScalar("nacionalidade", StringType.INSTANCE)
        .addScalar("cpf", StringType.INSTANCE)
        .addScalar("endereco", StringType.INSTANCE)
        .setResultTransformer(Transformers.aliasToBean(PessoaDTO.class)).list();

    }
}
