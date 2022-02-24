const express = require('express');
const { depositar, sacar, transferir } = require('../controllers/transacoes');
const { verificarNumeroContaTransacoes, verificarSaldo, verificarValor, verificarSenha } = require('../middlewares/transacoes');
const transacao = express.Router();

transacao.post('/transacoes/depositar', verificarNumeroContaTransacoes, verificarValor, depositar);
transacao.post('/transacoes/sacar', verificarNumeroContaTransacoes, verificarSenha, verificarValor, verificarSaldo, sacar);
transacao.post('/transacoes/transferir', verificarNumeroContaTransacoes, verificarSenha, verificarValor, verificarSaldo,  transferir);

module.exports = transacao;