module.exports = app => {
    const acomodacoes = require('../controllers/aco_acomodacao.controller');
    const router = require('express').Router();

    router.post('/add',acomodacoes.create);

    router.get('/see',acomodacoes.findAll);

    router.get('/see/:id',acomodacoes.findOne);

    router.get('/teste',acomodacoes.teste);

    app.use('/aco',router);
}