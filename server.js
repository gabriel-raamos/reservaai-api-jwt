const express = require('express');
const app = express();
const db = require('./models');

db.sequelize.sync();

const port = 8080;

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (req,res) => {
    res.json({message: "tudo nos conformes"});
})

require('./routes/cli_cliente.route')(app);
require('./routes/pro_proprietario.route')(app);
require('./routes/aco_acomodacao.route')(app);
require('./routes/end_endereco.route')(app);
require('./routes/ima_imagem.route')(app);
require('./routes/res_reserva.route')(app);
require('./routes/pag_pagamento.router')(app);

app.listen(port, () => {
    console.log(`we runnin on port ${port}`);
})

// https://youtu.be/mVIXU0x9ocI
// https://www.loginradius.com/blog/engineering/hashing-user-passwords-using-bcryptjs/  