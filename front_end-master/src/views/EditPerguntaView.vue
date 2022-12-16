<template>
  <div class="container">
    <h1 class="text-center">Formulário de Edição da Pergunta</h1>
    <form>
      <input type="hidden" v-model="pergunta.id" >
      <label for="titulo">Título:</label>
      <input class="form-control" type="text" v-model="pergunta.titulo" required />
      <br />
      <label for="descricao">Descrição:</label>
      <input class="form-control mb-3" type="text" v-model="pergunta.descricao" required />
      <button class="btn btn-dark" @click="salvaAlteracaoPergunta">Salvar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
  name: "PerguntaView",
  data: () => ({
    pergunta: {}
  }),
  methods: {
    salvaAlteracaoPergunta() {
      if (this.pergunta.titulo == undefined || this.pergunta.titulo == "") {
        alert("Informe um titulo válido!");
      } else if (this.pergunta.descricao == undefined || this.pergunta.descricao == "") {
        alert("Informe uma descrição válida!");
      } else {
        axios
          .put(`http://localhost:3000/pergunta/${this.pergunta.id}`, {
            titulo: this.pergunta.titulo,
            descricao: this.pergunta.descricao,
          })
          .then(() => {
            router.push("/");
          }).catch(err => {
            console.log(err);
          });
        
      }
    },
  },
  created() {
    const id = this.$route.params.id;

    axios
      .get(`http://localhost:3000/pergunta/${id}`)
      .then((pergunta) => { 
        this.pergunta = pergunta.data;
       })
  }
};
</script>
