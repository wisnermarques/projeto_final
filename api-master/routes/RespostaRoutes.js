const {
  salvaResposta,
  obterRespostas,
  excluirRespostas,
  excluirResposta,
} = require("../controllers/RespostaController");

const router = require("express").Router();

router.post("/save", salvaResposta);

router.get("/listar/:idPergunta", obterRespostas);

router.delete("/todas/:id", excluirRespostas);

router.delete("/:id", excluirResposta);

module.exports = router;
