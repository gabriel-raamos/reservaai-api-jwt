const db = require('../models');
const Proprietario = db.proprietario;

exports.create = (req,res) => {
    if(!req.body.pro_id){
        res.status(400).send({
            message: 'O conteúdo não pode ser vazio.'
        })
    }

    const proprietario = {
        pro_id: req.body.pro_id,
        pro_nome: req.body.pro_nome,
        pro_dt_nasc: req.body.pro_dt_nasc,
        pro_cpf: req.body.pro_cpf,
        pro_email: req.body.pro_email,
        pro_senha: req.body.pro_senha,
        aceite_novidades: req.body.aceite_novidades
    }

    Proprietario.create(proprietario)
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
    Proprietario.findAll()
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
    Proprietario.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send(`Não foi possível encontrar um proprietario com o id ${id}`)
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreu um erro.'
        })
    })
}

exports.teste = (req,res) => {
    Proprietario.findAll({
        attributes: [['pro_id', 'id do proprietario'], ['pro_nome', 'nome do proprietario']],
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

exports.teste2 = (req,res) => {
    Proprietario.findAll({
        attributes: [['pro_id', 'id do proprietario'], ['pro_nome', 'nome do proprietario']],
        include: [
            {
                model: db.acomodacao,
                as: 'acomodações',
                attributes: [
                    ['aco_nome','nome das acomodações'],['aco_id','id das acomodações']
                ]
            }
        ]
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

exports.teste3 = (req,res) => {
    Proprietario.findAll({
        attributes: [['pro_id', 'id do proprietario'], ['pro_nome', 'nome do proprietario']],
        include: [
            {
                model: db.acomodacao,
                as: 'acomodações',
                attributes: [
                    ['aco_nome','nome das acomodações'],['aco_id','id das acomodações'],'end_id'
                ],
                including: {
                    model: db.endereco,
                    attributes: [
                        'end_id','end_cidade'
                    ]
                }
            }            
        ]
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