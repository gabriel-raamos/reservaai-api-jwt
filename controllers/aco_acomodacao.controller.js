const db = require('../models');
const Acomodacao = db.acomodacao;

exports.create = (req,res) => {
    if(!req.body.aco_id){
        res.status(400).send({
            message: 'O conteúdo não pode ser vazio.'
        })
    }

    const acomodacao = {
        aco_id: req.body.aco_id,
        aco_nome: req.body.aco_nome,
        aco_descricao: req.body.aco_descricao,
        aco_tipo: req.body.aco_tipo,
        aco_capacidade: req.body.aco_capacidade,
        aco_total_notas: req.body.aco_total_notas,
        aco_qtd_avaliacoes: req.body.aco_qtd_avaliacoes,
        aco_nota: req.body.aco_nota,
        aco_capacidade_garagem: req.body.aco_capacidade_garagem,
        aco_qtd_banheiros: req.body.aco_qtd_banheiros,
        aco_qtd_quartos: req.body.aco_qtd_quartos,

        aco_aquecimento: req.body.aco_aquecimento,
        aco_resfriamento: req.body.aco_resfriamento,
        aco_churrasqueira: req.body.aco_churrasqueira,
        aco_fogao: req.body.aco_fogao,
        aco_geladeira: req.body.aco_geladeira,
        aco_televisao: req.body.aco_televisao,
        aco_internet: req.body.aco_internet,
        aco_piscina: req.body.aco_piscina,
        aco_pet_friendly: req.body.aco_pet_friendly,
        aco_politica_cancelamento: req.body.aco_politica_cancelamento,
        aco_checkout_estendido: req.body.aco_checkout_estendido,
        aco_acessibilidade: req.body.aco_acessibilidade,

        pro_id: req.body.pro_id,
        end_id: req.body.end_id
    }

    Acomodacao.create(acomodacao)
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
    Acomodacao.findAll()
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
    Acomodacao.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send(`Não foi possível encontrar uma acomodação com o id ${id}`)
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || 'Ocorreu um erro.'
        })
    })
}

exports.teste = (req,res) => {
    Acomodacao.findAll({
        attributes: [['aco_id','id da acomodação'],['aco_nome','nome da acomodação']]
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