package com.nfstudio.backprojetos.service;

import com.nfstudio.backprojetos.entity.Projetos;
import com.nfstudio.backprojetos.repository.ProjetosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjetosService {
    @Autowired
    private ProjetosRepository repository;

    public List<Projetos> buscarTodos(){
        return repository.findAll();
    }

    public Projetos inserir(Projetos projeto){
        if (projeto.getValorPago() == null || projeto.getValorPago() == 0
        || projeto.getDataPagamento() == null){
            projeto.setStatus("pendente");
        }else {
            projeto.setStatus("realizado");
        }
        return repository.saveAndFlush(projeto);
    }
    public Projetos altera(Projetos projeto){
        if (projeto.getValorPago() != null && projeto.getValorPago() > 0
                && projeto.getDataPagamento() != null){
            projeto.setStatus("Realizado");
        }
        return repository.saveAndFlush(projeto);
    }

    public List<Projetos> buscarProjetosPendentes(){
        return repository.projetosPagamentoPendente();
    }

    public List<Projetos> buscarProjetosCancelados(){
        return repository.projetosCancelados();
    }


    public void cancelar(Long id){
        Projetos projeto = repository.findById(id).get();
        projeto.setStatus("cancelado");
        repository.save(projeto);
    }
    public void excluir(Long id){
        Projetos projeto = repository.findById(id).get();
        repository.delete(projeto);
    }

}
