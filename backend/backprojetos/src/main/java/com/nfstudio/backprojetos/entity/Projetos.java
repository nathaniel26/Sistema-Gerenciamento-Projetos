package com.nfstudio.backprojetos.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "projetos")
@Data
public class Projetos {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nomeClient;
    @Temporal(TemporalType.DATE)
    private Date dataInicio = new Date();
    @Temporal(TemporalType.DATE)
    private Date dataTermino;
    private String descricaoProjeto;
    private Double valorProjeto;
    private Double valorPago;
    @Temporal(TemporalType.DATE)
    private Date dataPagamento;
    private String status; //pendente, realizado, cancelado


}
