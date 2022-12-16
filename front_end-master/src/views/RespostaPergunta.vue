<template>
  <div class="container">
    <h1 class="text-center">Formulário da Resposta</h1>
    <div class="card">
      <div class="card-header">
        <h3>{{ pergunta.titulo }}</h3>
      </div>
      <form class="m-3">
        <input type="hidden" v-model="pergunta.id" />
        <br />
        <label for="descricao">Resposta:</label>
        <textarea
          v-model="resposta"
          class="form-control mb-3"
          required
        ></textarea>
        <button class="btn btn-dark" @click="salvarResposta">Salvar</button>
      </form>
    </div>
    <hr />
    <h3>Respostas</h3>
    <div class="card mt-3" v-for="(res, indice) in respostas" :key="indice">
      <div class="card-header">
        <h6>
          Data da Resposta: {{ new Date(res.createdAt).toLocaleString() }}
        </h6>
      </div>
      <div class="card-body">
        {{ res.resposta }}
      </div>
      <div class="card-footer d-flex">
        <button class="btn btn-success">Editar</button>

        <button class="btn btn-danger mx-3" @click="excluirResposta(res.id)">
          Excluir
        </button>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
  name: "RespostaPergunta",
  data: () => ({
    pergunta: {},
    respostas: {},
    resposta: "",
  }),
  methods: {
    salvarResposta() {
      if (this.resposta == undefined || this.resposta == "") {
        alert("Informe uma resposta válida!");
      } else {
        axios
          .post("http://localhost:3000/resposta/save", {
            resposta: this.resposta,
            perguntaId: this.pergunta.id,
          })
          .then(() => {
            alert("Resposta salva com sucesso!");
            router.push(`/resposta/${this.pergunta.id}`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    excluirResposta(id) {
      if (isNaN(id)) {
        alert("Não foi possível excluir resposta");
      } else {
        axios
          .delete(`http://localhost:3000/resposta/${id}`)
          .then((resposnse) => {
            if (resposnse) {
              console.log("Resposta excluída com sucesso!");
              router.go(`/resposta/${this.pergunta.id}`);
            }
          });
      }
    },
  },
  created() {
    const idPergunta = this.$route.params.idPergunta;
    axios
      .get(`http://localhost:3000/pergunta/${idPergunta}`)
      .then((pergunta) => {
        this.pergunta = pergunta.data;
      });

    axios({
      method: "get",
      url: `http://localhost:3000/resposta/listar/${idPergunta}`,
    }).then((response) => {
      this.respostas = response.data;
    });
  },
};
</script>
