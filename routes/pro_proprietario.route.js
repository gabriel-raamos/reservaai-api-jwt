module.exports = app => {
    const proprietarios = require('../controllers/pro_proprietario.controller');
    const router = require('express').Router();
    const mid_pro = require('../middlewares/pro_proprietario.middleware');

    router.post('/add',proprietarios.create);

    router.get('/see', mid_pro.jwtbasic,proprietarios.findAll);

    router.get('/see/:id', mid_pro.jwtbasic,proprietarios.findOne);

    router.get('/teste', mid_pro.jwtbasic,proprietarios.teste);

    router.get('/teste2',proprietarios.teste2);

    router.get('/teste3',proprietarios.teste3);

    router.post('/login', mid_pro.login);

    router.post('/logout',mid_pro.logout);

    router.get('/validate',mid_pro.validate);

    app.use('/pro',router);
}