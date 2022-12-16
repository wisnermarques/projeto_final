const { obterPerguntas, salvaPergunta, excluiPergunta, atualizaPergunta, obterPerguntaPeloId } = require('../controllers/PerguntaController');

const router = require('express').Router();

router.get('/', obterPerguntas);

router.get('/:id', obterPerguntaPeloId);

router.post('/save', salvaPergunta);

router.delete('/:id', excluiPergunta);

router.put('/:id', atualizaPergunta);

module.exports = router;