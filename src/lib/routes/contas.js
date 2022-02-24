const express = require('express');
const {
    listaDeContas,
    criarContaBancaria,
    atualizarDadosUsuario,
    deletarConta,
    saldo,
    extrato
} = require('../controllers/contas');
const { 
    verificarNumeroConta, 
    verificarSenhaBanco, 
    verificarCampos, 
    verificarSaldoNaConta, 
    verificarSenhaQuery 
} = require('../middlewares/contas');
const contas = express.Router();

contas.get('/contas', verificarSenhaBanco, listaDeContas);
contas.post('/contas', verificarCampos, criarContaBancaria);
contas.put('/contas/:numeroConta/usuario', verificarNumeroConta, verificarCampos, atualizarDadosUsuario);
contas.delete('/contas/:numeroConta', verificarNumeroConta, verificarSaldoNaConta , deletarConta);
contas.get('/contas/saldo', verificarNumeroConta, verificarSenhaQuery, saldo);
contas.get('/contas/extrato', verificarNumeroConta, verificarSenhaQuery, extrato);

module.exports = contas;
