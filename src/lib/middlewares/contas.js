const { contas, banco } = require('../database/bancodedados');

function verificarNumeroConta(req, res, next) {
    if (Object.keys(req.params).length > 0) {
        const { numeroConta } = req.params;
        const numeroExiste = contas.find((conta) => conta.numero == numeroConta);
        res.locals.usuario = numeroExiste;
        if(!numeroExiste){
            return res.status(404).json({ message: 'Número da conta é inválido' });
        }
    }
    if (Object.keys(req.query).length > 0) {
        const { numero_conta } = req.query;
        const numeroExiste = contas.find((conta) => conta.numero == numero_conta);
        res.locals.usuario = numeroExiste;
        if(!numeroExiste){
            return res.status(404).json({ message: 'Número da conta é inválido' });
        }
    }
    next();
}
function verificarSenhaBanco(req, res, next) {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(400).json({ mensagem: 'A senha do banco é obrigatória!' });
    }
    if (senha_banco !== banco.senha) {
        return res.status(400).json({ mensagem: 'A senha do banco informada é inválida!' });
    }
    next();
}
function verificarSaldoNaConta(req, res, next) {
    const conta = res.locals.usuario;
    if (conta.saldo > 0) {
        return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }
    next();
}
function verificarCampos(req, res, next) {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const cpfExiste = contas.find((conta) => conta.usuario.cpf == cpf);
    const emailExiste = contas.find((conta) => conta.usuario.email === email);

    if (!nome && !cpf && !data_nascimento && !telefone && !email && !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    if (cpfExiste) {
        return res.status(400).json({ mensagem: 'CPF já existe cadastrado!' });
    }
    if (emailExiste) {
        return res.status(400).json({ mensagem: 'E-mail já existe cadastrado!' });
    }
    if (cpf.length !== 11) {
        return res.status(400).json({ mensagem: 'CPF inválido!' });
    }
    next();
}
function verificarSenhaQuery(req,res,next){
    const { senha } = req.query;
    const conta = res.locals.usuario;
    if (senha !== conta.usuario.senha) {
        return res.status(400).json({ mensagem: 'Senha incorreta!' });
    };
    next();
}
module.exports = { 
    verificarNumeroConta,
    verificarSenhaBanco, 
    verificarSaldoNaConta, 
    verificarCampos, 
    verificarSenhaQuery 
};
