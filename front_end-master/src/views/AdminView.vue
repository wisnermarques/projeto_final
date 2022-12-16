<template>
  <div class="container">
    <h3 class="display-4">Perguntas</h3>
    <hr />
    <table class="table table-dark table-striped">
      <thead>
        <tr>
          <th scope="col">id</th>
          <th scope="col">Título</th>
          <th scope="col">Descrição</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pergunta, indice) in perguntas" :key="indice">
          <td>{{ pergunta.id }}</td>
          <td>{{ pergunta.titulo }}</td>
          <td>{{ pergunta.descricao }}</td>
          <td>
            <router-link
              class="btn btn-success me-3"
              :to="`/pergunta/edit/${pergunta.id}`"
              >Editar</router-link
            >
            <button
              class="btn btn-danger me-3"
              @click="excluirPergunta(pergunta.id)"
            >
              Excluir
            </button>
            <router-link
              class="btn btn-success me-3"
              :to="`/resposta/${pergunta.id}`"
              >Ver respostas</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
  name: "AdminView",
  data: () => ({
    perguntas: [],
  }),
  methods: {
    async excluirPergunta(id) {
      const response = await axios.delete(
        `http://localhost:3000/resposta/todas/${id}`
      );

      if (response) {
        await axios.delete(`http://localhost:3000/pergunta/${id}`);
        alert("Pergunta excluída com sucesso!");
        router.go("/admin");
      } else {
        alert("Houve um erro, tente novamente mais tarde!");
        router.go("/admin");
      }
    },
  },
  created() {
    axios({
      method: "get",
      url: "http://localhost:3000/pergunta",
    }).then((response) => {
      this.perguntas = response.data;
    });
  },
};
</script>
