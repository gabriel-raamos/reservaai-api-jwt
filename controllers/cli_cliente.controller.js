const db = require('../models');
const Cliente = db.cliente;
const bcrypt = require('bcrypt');

exports.create = (req,res) => {
    if(!req.body.cli_id){
        res.status(400).send({
            message: 'O conteúdo não pode ser vazio.'
        })
    }

    const cliente = {
        cli_id: req.body.cli_id,
        cli_nome: req.body.cli_nome,
        cli_dt_nasc: req.body.cli_dt_nasc,
        cli_cpf: req.body.cli_cpf,
        cli_email: req.body.cli_email,
        cli_senha: req.body.cli_senha,
        aceite_novidades: req.body.aceite_novidades
    }
    
    // cliente.cli_senha = bcrypt.hash(cliente.cli_senha, 8)
    Cliente.create(cliente)
    
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreu um erro.'
        })
    })
}

exports.findAll = (req,res) => {
/*     let token = req.headers.token;
    var decoded = jwt.verify(token, 'mysecrets');
    res.send(JSON.stringify(decoded)); */

    Cliente.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreu um erro.'
        })
    })
}

exports.findOne = (req,res) => {
    const id = req.params.id;
    Cliente.findByPk(id, {
        attributes: ['cli_id', 'cli_nome']
    })
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send(`Não foi possível encontrar um cliente com o id ${id}`)
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreu um erro.'
        })
    })
}

exports.teste = (req,res) => {
    Cliente.findAll({
        attributes: ['cli_id','cli_nome']
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreu um erro.'
        })
    })
}

/* exports.zap = (req,res) => {
    const id = req.params.id;
    Cliente.findByPk(id,{
        attributes: ['cli_nome']
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreu um erro.'
        })
    })
} */

exports.zap = (req,res) => {
    cli_email = req.body.cli_email;    
    cli_senha = req.body.cli_senha;

    cli_senha = bcrypt.hash(req.body.cli_senha,8, (err,hash) => {
        if (err) {
            res.json('houve um erro');
        } else if (hash) {
            res.json(hash);
            console.log(hash);
        }
    });

    Cliente.findOne({
        where: {
            cli_email,cli_senha
        },
        attributes: ['cli_email','cli_senha']
    })
    .then(data => {
        res.json(Cliente.cli_senha);
        console.log(data);
    })
    .catch(err => {
        res.json('ocorreu um erro')
    })

    /* bcrypt.compareSync(cli_senha, Cliente.dataValues.cli_senha)
    .then(() => {
        res.json({message: 'sucesso!!!'})
        console.log('sucesso');
    })
    .catch(() => {
        res.json({message: 'ocorreu um erro!!'})
        console.log('ocorreu um erro')
    })
    console.log(Cliente.cli_senha); */
}



