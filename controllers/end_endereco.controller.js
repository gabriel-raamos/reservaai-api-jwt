const db = require('../models');
const Endereco = db.endereco;

exports.create = (req,res) => {
    if(!req.body.end_id){
        res.status(400).send({
            message: 'O conteúdo não pode ser vazio.'
        })
    }

    const endereco = {
        end_id: req.body.end_id,
        end_logradouro: req.body.end_logradouro,
        end_numero: req.body.end_numero,
        end_bairro: req.body.end_bairro,
        end_cep: req.body.end_cep,
        end_cidade: req.body.end_cidade,
        end_uf: req.body.end_uf
    }

    Endereco.create(endereco)
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
    Endereco.findAll()
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
    Endereco.findByPk(id)
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