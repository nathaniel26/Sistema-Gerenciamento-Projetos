package com.nfstudio.backprojetos.controller;

import com.nfstudio.backprojetos.entity.Projetos;
import com.nfstudio.backprojetos.service.ProjetosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projetos")
public class ProjetosController {
    @Autowired
    private ProjetosService service;

    @GetMapping("/")
    @CrossOrigin("http://localhost:3000")
    public List<Projetos> buscarTodos(){
        return service.buscarTodos();
    }
    @GetMapping("/pendentes")
    @CrossOrigin("http://localhost:3000")
    public List<Projetos> buscarProjetosPendentes(){
        return service.buscarProjetosPendentes();
    }

    @GetMapping("/cancelados")
    @CrossOrigin("http://localhost:3000")
    public List<Projetos> buscarProjetosCancelados(){
        return service.buscarProjetosCancelados();
    }
    @PostMapping("/")
    @CrossOrigin("http://localhost:3000")
    public Projetos inserir(@RequestBody Projetos projeto){
        return service.inserir(projeto);
    }
    @PutMapping("/")
    @CrossOrigin("http://localhost:3000")
    public Projetos alterar(@RequestBody Projetos projeto){
        return service.altera(projeto);
    }

    @PostMapping("/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Void> cancelar(@PathVariable("id")Long id){
        service.cancelar(id);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{id}")
    @CrossOrigin("http://localhost:3000")
    public ResponseEntity<Void> excluir(@PathVariable("id")Long id){
        service.excluir(id);
        return ResponseEntity.ok().build();
    }


}
