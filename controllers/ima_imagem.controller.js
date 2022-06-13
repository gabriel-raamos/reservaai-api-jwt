const db = require('../models');
const Imagem = db.imagem;

exports.create = (req,res) => {
    if(!req.body.ima_id){
        res.status(400).send({
            message: 'O conteúdo não pode ser vazio.'
        })
    }

    const imagem = {
        ima_id: req.params.ima_id,
        ima_diretorio: req.params.ima_diretorio
    }

    Imagem.create(imagem)
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
    Imagem.findAll()
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
    Imagem.findByPk(id)
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