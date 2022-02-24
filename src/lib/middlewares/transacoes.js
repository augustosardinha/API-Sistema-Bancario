const { contas } = require('../database/bancodedados');

function verificarNumeroContaTransacoes(req, res, next) {
    const { numero_conta, numero_conta_origem, numero_conta_destino } = req.body;

    if (numero_conta) {
        const numeroExiste = contas.find((conta) => conta.numero == numero_conta);
        res.locals.usuario = numeroExiste;
        if (!numeroExiste) {
            return res.status(404).json({ message: 'Número da conta é inválido' });
        }
    }
    if (numero_conta_origem) {
        const numeroExiste = contas.find((conta) => conta.numero == numero_conta_origem);
        res.locals.usuario = numeroExiste;
        if (!numeroExiste) {
            return res.status(404).json({ message: 'Número da conta de origem é inválido' });
        }
    }
    if (numero_conta_destino) {
        const numeroExiste = contas.find((conta) => conta.numero == numero_conta_destino);
        if (!numeroExiste) {
            return res.status(404).json({ message: 'Número da conta de destino é inválido' });
        }
    }
    next();
}

function verificarValor(req, res, next) {
    const { valor } = req.body;
    if (!valor || valor <= 0) {
        return res.status(400).json({ mensagem: 'Valor inválido!' });
    }
    next();
}

function verificarSaldo(req, res, next) {
    const { valor } = req.body;
    const conta = res.locals.usuario;
    if (valor > conta.saldo) {
        return res.status(400).json({ mensagem: 'Saldo insuficiente!' });
    }
    next();
}
function verificarSenha(req, res, next) {
    const { senha } = req.body;
    const conta = res.locals.usuario;
    if (senha !== conta.usuario.senha) {
        return res.status(400).json({ mensagem: 'Senha incorreta!' });
    }
    next();
}

module.exports = { verificarNumeroContaTransacoes, verificarSaldo, verificarValor, verificarSenha };
