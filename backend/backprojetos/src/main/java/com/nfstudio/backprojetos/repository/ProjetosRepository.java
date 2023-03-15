package com.nfstudio.backprojetos.repository;


import com.nfstudio.backprojetos.entity.Projetos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProjetosRepository extends JpaRepository<Projetos, Long> {
    @Query("select s from Projetos s where (s.valorPago is null or s.valorPago = 0) and s.status != 'cancelado'")
    List<Projetos> projetosPagamentoPendente();

    @Query("select s from Projetos s where s.status = 'cancelado'")
    List<Projetos> projetosCancelados();

}
