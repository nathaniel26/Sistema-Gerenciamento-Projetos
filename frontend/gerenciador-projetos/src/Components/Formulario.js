import React, { useEffect, useState } from "react";
import axios from "axios";
function Formulario() {
  const [projeto, setProjeto] = useState({
    nomeClient: "",
    dataInicio: "",
    dataTermino: "",
    descricaoProjeto: "",
    valorProjeto: "",
    valorPago: "",
    dataPagamento: "",
    status: "",
  });
  const [projetos, setProjetos] = useState([]);
  const [atualizar, setAtualizar] = useState();

  useEffect(() => {
    buscarTodos();
  }, [atualizar]);

  function handleChange(event) {
    setProjeto({ ...projeto, [event.target.name]: event.target.value });
  }

  function buscarTodos() {
    axios.get("http://localhost:8080/api/projetos/").then((result) => {
      setProjetos(result.data);
    });
  }

  function buscarPendentes() {
    axios.get("http://localhost:8080/api/projetos/pendentes").then((result) => {
      setProjetos(result.data);
    });
  }

  function buscarCancelados() {
    axios
      .get("http://localhost:8080/api/projetos/cancelados")
      .then((result) => {
        setProjetos(result.data);
      });
  }

  function limpar() {
    setProjeto({
      nomeClient: " ",
      dataInicio: " ",
      dataTermino: " ",
      descricaoProjeto: " ",
      valorProjeto: " ",
      valorPago: "",
      dataPagamento: " ",
    });
  }
  function excluir(id) {
    axios.delete("http://localhost:8080/api/projetos/" + id).then((result) => {
      setAtualizar(result);
    });
  }

  function cancelar(id) {
    axios.post("http://localhost:8080/api/projetos/" + id).then((result) => {
      setAtualizar(result);
    });
  }

  function onSubmit(event) {
    event.preventDefault();
    if (projeto.id == undefined) {
      axios
        .post("http://localhost:8080/api/projetos/", projeto)
        .then((result) => {
          setAtualizar(result);
        });
    } else {
      axios
        .put("http://localhost:8080/api/projetos/", projeto)
        .then((result) => {
          setAtualizar(result);
        });
    }
    limpar();
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="col-sm-6  row g-1">
          <div>
            <label className="form-label">Nome do Cliente</label>
            <input
              onChange={handleChange}
              value={projeto.nomeClient || "Dado Ausente"}
              name="nomeClient"
              type="text"
              className="form-control"
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label">Data de Inicio</label>
            <input
              onChange={handleChange}
              value={projeto.dataInicio || "1900-01-01"}
              name="dataInicio"
              type="date"
              className="form-control"
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label">Data de Termino</label>
            <input
              onChange={handleChange}
              value={projeto.dataTermino || "1900-01-01"}
              name="dataTermino"
              type="date"
              className="form-control"
            />
          </div>
          <div>
            <label className="form-label">Descrição do Projeto</label>
            <input
              type="text"
              onChange={handleChange}
              value={projeto.descricaoProjeto || "Dado Ausente"}
              name="descricaoProjeto"
              className="form-control"
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label">Valor do Projeto</label>
            <input
              onChange={handleChange}
              value={projeto.valorProjeto || 0}
              name="valorProjeto"
              type="number"
              className="form-control"
            />
          </div>
          <div className="col-sm-6">
            <label className="form-label">Valor Pago</label>
            <input
              onChange={handleChange}
              value={projeto.valorPago || 0}
              name="valorPago"
              type="number"
              className="form-control"
            />
          </div>
          <div className="col-sm-5">
            <label className="form-label">Data de Pagamento</label>
            <input
              onChange={handleChange}
              value={projeto.dataPagamento || "1900-01-01"}
              name="dataPagamento"
              type="date"
              className="form-control"
            />
          </div>

          <div>
            <br></br>
            <input
              type="submit"
              className="btn btn-success col-3"
              value="Cadastrar"
            ></input>
            &nbsp;&nbsp;
            <button
              onClick={limpar}
              type="button"
              class="btn btn-primary col-3"
            >
              Limpar
            </button>
          </div>
        </div>
      </form>
      <br></br>
      <hr></hr>
      <div className="container">
        <button onClick={buscarTodos} type="button" class="btn btn-primary">
          Listar Todos
        </button>
        &nbsp;&nbsp;
        <button
          onClick={buscarCancelados}
          type="button"
          class="btn btn-secondary"
        >
          Projetos Cancelados
        </button>
        &nbsp;&nbsp;
        <button onClick={buscarPendentes} type="button" class="btn btn-success">
          Projetos Pendentes
        </button>
        &nbsp;&nbsp;
        <br></br>
        <br></br>
        {/*aqui começa a tabela*/}
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Descrição</th>
              <th scope="col">Valor</th>
              <th scope="col">Status</th>
              <th scope="col">Opções</th>
            </tr>
          </thead>
          <tbody>
            {projetos.map((proj) => (
              <tr key={proj.id}>
                <td>{proj.nomeClient}</td>
                <td>{proj.descricaoProjeto}</td>
                <td>{proj.valorProjeto}</td>
                <td>{proj.status}</td>
                <td>
                  {proj.status != "cancelado" && (
                    <button
                      onClick={() =>
                        cancelar(proj.id).then((result) => {
                          setAtualizar(result);
                        })
                      }
                      type="button"
                      class="btn btn-warning"
                    >
                      Cancelar
                    </button>
                  )}
                  &nbsp;&nbsp;
                  <button
                    onClick={() => setProjeto(proj)}
                    type="button"
                    class="btn btn-primary"
                  >
                    Alterar
                  </button>
                  &nbsp;&nbsp;
                  <button
                    onClick={() => excluir(proj.id)}
                    type="button"
                    class="btn btn-danger"
                  >
                    Excluir
                  </button>
                  &nbsp;&nbsp;
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br></br>
    </div>
  );
}
export default Formulario;
