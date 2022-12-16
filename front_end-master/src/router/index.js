import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/pergunta",
    name: "pergunta",
    component: () => import("../views/PerguntaView.vue"),
  },
  {
    path: "/admin",
    name: "adminperguntas",
    component: () => import("../views/AdminView.vue"),
  },

  {
    path: "/pergunta/edit/:id",
    name: "edit",
    params: true,
    component: () => import("../views/EditPerguntaView.vue"),
  },
  {
    path: "/resposta/:idPergunta",
    name: "resposta",
    params: true,
    component: () => import("../views/RespostaPergunta.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
