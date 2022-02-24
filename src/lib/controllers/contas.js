const { contas , depositos, saques, transferencias } = require("../database/bancodedados")
let count = 1;

function listaDeContas(req,res){
    return res.status(200).json(contas);
}

function criarContaBancaria(req,res){
    const { nome, cpf , data_nascimento, telefone, email, senha } = req.body;
    const conta = {
        numero: count++,
        saldo: 0,
        usuario:{ nome, cpf, data_nascimento, telefone, email, senha }
    };
    contas.push(conta);

    return res.status(201).send();  
}

function atualizarDadosUsuario(req,res){
    const { nome, cpf , data_nascimento, telefone, email, senha } = req.body;
    const conta = res.locals.usuario;
    const usuario = { nome, cpf, data_nascimento, telefone, email, senha }
    conta.usuario = usuario;

    return res.status(204).send();
}

function deletarConta(req,res){
    const { numeroConta } = req.params;
    const indexUsuario = contas.findIndex(usuario => usuario.numero == numeroConta);
    contas.splice(indexUsuario, 1);

    return res.status(204).send();
}

function saldo(req,res) {   
    const conta = res.locals.usuario;
    return res.status(200).json({ saldo: conta.saldo });
}

function extrato(req,res) {
    const { numero_conta } = req.query;
    
    let extrato = [];
    const depositosRealizados = depositos.filter(deposito => deposito.numero_conta == numero_conta);
    const saquesRealizados = saques.filter(saque => saque.numero_conta == numero_conta);
    const transferenciasEnviadas = transferencias.filter(transf => transf.numero_conta_origem == numero_conta);
    const transferenciasRecebidas = transferencias.filter(transf => transf.numero_conta_destino == numero_conta);
    extrato.push(
        { depositos: depositosRealizados },
        { saques: saquesRealizados },
        { transferenciasEnviadas },
        { transferenciasRecebidas }
    );

    return res.status(200).json(extrato);
}

module.exports = {  
    listaDeContas , criarContaBancaria , atualizarDadosUsuario, deletarConta, saldo, extrato
}