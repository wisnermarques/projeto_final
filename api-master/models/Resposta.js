const { DataTypes } = require("sequelize");

const connection = require("../database/connection");

const Pergunta = require('./Pergunta');

const Resposta = connection.define("respostas", {
  resposta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   
});

Pergunta.hasMany(Resposta);

Resposta.sync();

module.exports = Resposta;