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

{
// TESTE JWT
// require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.get('/clientes', (req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'luiz'}]);
}) 

app.post('/login', (req,res,next) => {

    const {user, password} = req.body;
    
    // esse usuário deverá vir do banco de dados
    if(user === 'luiz' && password === '123'){
        //auth ok
        const id = 1; //esse id viria do banco de dados
        const token = jwt.sign({ id }, 'mysecrets', {
          expiresIn: 300 // expires in 5min
        });
        return res.json({ auth: true, token: token });
      }
    res.status(500).json({message: 'login inválido.'})
})

app.post('/logout', (req,res) => {
    res.json({ auth: false, token: null})
})

verifyJWT = (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
    }
    
    jwt.verify(token, 'mysecrets', function(err, decoded) {
      if (err) {
        return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      }

      req.userId = decoded.id;
      next();
    });
}

app.get('/clientes', verifyJWT, (req, res, next) => { 
    console.log("AAAAAAAAAAAAAAAA");
    res.json([{id:1,nome:'luiz'}]);
})

const dadosUsuario = {
    nome: "marcelo",
    email: "teste@gmail.com",
    id: 1
};

app.get('/opa', (req,res) => {
    //const {usuario, senha} = req.body;

    let token = req.headers.token;
    var decoded = jwt.verify(token, 'mysecrets');
    res.send(JSON.stringify(decoded));
})

//const {usuario, senha} = req.body;

const usuario = "";
const senha = "";

app.post('/zap', (req,res) => {
    if (req.body.usuario === 'gabriel' && req.body.senha === '123' ) {
        const id = 1;

        /* const token = jwt.sign({usuario, senha}, 'mysecrets', {
            expiresIn: 5000
        }) */

        const token = jwt.sign({id}, 'mysecrets', {
            expiresIn: 5000
        })

        return res.json({auth: true, token: token})
    }
    res.status(500).json({message: 'login inválido!'});
})

app.get('/postzap', (req,res) => {
    const token_header = req.headers['token'];

    if (!token_header) {
        return res.status(401).json({ auth: false, message: 'TOKEN NÃO REBECIDO' });
    }

    jwt.verify(token_header, 'mysecrets', (err,decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: 'TOKEN NÃO AUTENTICADO' });
        }

        // req.userId = decoded.id;

        console.log("User Id: " + decoded.id)
        res.json({message: 'whatsapp'})
    })
})
}
// ------------ --------------

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