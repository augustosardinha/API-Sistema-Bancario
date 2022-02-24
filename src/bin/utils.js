const { saques, depositos, transferencias } = require("../lib/database/bancodedados");
const { format } = require('date-fns');

module.exports = { 
    adicionarNoBDD(conta, valor, tipo){
        const data = format(new Date(), "yyyy-MM-dd hh:mm:ss");

        if(tipo === 'deposito'){
            depositos.push({ data, numero_conta: Number(conta), valor })
        } else if(tipo === 'saque'){
            saques.push({ data, numero_conta: Number(conta), valor })
        } else {
            transferencias.push({ 
                data,
                numero_conta_origem: Number(conta[0]), 
                numero_conta_destino: Number(conta[1]), 
                valor 
            });
        }
    }
} 
