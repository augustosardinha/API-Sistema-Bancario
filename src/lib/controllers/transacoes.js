const { contas } = require('../database/bancodedados');
const { adicionarNoBDD } = require('../../bin/utils');

function depositar(req,res){
    const { numero_conta, valor} = req.body;
    const conta = res.locals.usuario;
    conta.saldo += valor;
    adicionarNoBDD(numero_conta, valor, 'deposito');

    return res.status(204).send();
}

function sacar(req,res){
    const { numero_conta, valor} = req.body;
    const conta = res.locals.usuario;
    conta.saldo -= valor;
    adicionarNoBDD(numero_conta, valor, 'saque');

    return res.status(204).send();
}

function transferir(req,res) {
    const { numero_conta_origem, numero_conta_destino, valor } = req.body;
    const contaOrigem = contas.find(usuario => usuario.numero== numero_conta_origem);
    const contaDestino = contas.find(usuario => usuario.numero == numero_conta_destino);
    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;
    adicionarNoBDD([numero_conta_origem, numero_conta_destino], valor, 'transferir');
    
    return res.status(204).send();
}

module.exports = { depositar, sacar, transferir }