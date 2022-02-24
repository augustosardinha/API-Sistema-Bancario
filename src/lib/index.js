const express = require('express');
const contas = require('./routes/contas');
const transacao = require('./routes/transacoes');
const app = express();

app.use(express.json());
app.use(contas);
app.use(transacao);

app.listen(8000);
