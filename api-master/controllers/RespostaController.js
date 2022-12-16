const Pergunta = require("../models/Pergunta");
const Resposta = require("../models/Resposta");

function salvaResposta(req, res) {
  const id = req.body.perguntaId;

  Pergunta.findByPk(id).then((pergunta) => {
    if (pergunta) {
      const { resposta } = req.body;
      if (resposta == undefined || resposta == "") {
        res.status(202).json({ error: "A resposta deve ser informada!" });
      } else {
        Resposta.create({
          resposta,
          perguntaId: pergunta.id,
        })
          .then((resposta) => res.status(201).json(resposta))
          .catch((err) => {
            res
              .status(400)
              .json({ error: "Não foi possível salvar a resposta" });
          });
      }
    }
  });
}

function obterRespostas(req, res) {
  const idPergunta = req.params.idPergunta;
  Resposta.findAll({
    where: { perguntaId: idPergunta },
  })
    .then((respostas) => {
      res.status(200).json(respostas);
    })
    .catch((erro) => res.status(400).json({ error: "Houve um erro interno" }));
}

function excluirRespostas(req, res) {
  const perguntaId = req.params.id;
  if (!isNaN(perguntaId)) {
    Resposta.destroy({ where: { perguntaId: perguntaId } })
      .then(() => {
        res.status(200).json({ msg: "Respostas excluídas com sucesso!" });
      })
      .catch((err) => {
        res.status(400).json({ error: "Houve um erro interno" });
      });
  } else {
    res.status(202).json({ error: "Não existe respostas com este id" });
  }
}

function excluirResposta(req, res) {
  const id = req.params.id;
  if (!isNaN(id)) {
    Resposta.destroy({ where: { id: id } })
      .then(() => {
        res.status(200).json({ msg: "Resposta excluída com sucesso!" });
      })
      .catch((err) => {
        res.status(400).json({ error: "Houve um erro interno" });
      });
  } else {
    res.status(202).json({ error: "Não existe resposta com este id" });
  }
}

module.exports = {
  salvaResposta,
  obterRespostas,
  excluirRespostas,
  excluirResposta,
};
