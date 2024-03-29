module.exports = app => {
    const pagamentos = require('../controllers/pag_pagamento.controller');
    const router = require('express').Router();

    router.post('/add',pagamentos.create);

    router.get('/see',pagamentos.findAll);

    router.get('/see/:id', pagamentos.findOne);

    app.use('/pag',router);
}