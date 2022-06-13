module.exports = app => {
    const imagens = require('../controllers/ima_imagem.controller');
    const router = require('express').Router();

    router.post('/add',imagens.create);

    router.get('/see',imagens.findAll);

    router.get('/see/:id',imagens.findOne);

    app.use('/ima',router);
}