const db = require('../models');
const Proprietario = db.proprietario;
const jwt = require('jsonwebtoken');

// LOGIN
// SEM CRIPTOGRAFIA
exports.login = (req,res) => {
    const {pro_email, pro_senha} = req.body;

    Proprietario.findOne({
        where: {
            pro_email, pro_senha
        },
        attributes: ['pro_email','pro_senha']
    })

    .then((data) => {
        if (pro_email == data.pro_email && pro_senha == data.pro_senha) {
            const token = jwt.sign({pro_email,pro_senha}, 'mysecrets', {
                expiresIn: 60
            })

            return res.json({auth: true, token: token});
        } else {
            res.status(500).json({message: 'login inválido!'});
        }

    })
    .catch(() => {
        res.json('ocorreu um erro');
    })
}

// LOGOUT
exports.logout = (req,res) => {
    res.json({ auth: false, token: null })
}

// VALIDAÇÃO
exports.validate = (req,res) => {
    var readtoken = req.headers['pro'];

    if (!readtoken) {
        res.json('nenhum token recebido')
    }

    jwt.verify(readtoken, 'mysecrets', (err,data) => {
        if (data) {
            res.json(data);
        } else if (err) {
            res.json('Ocorreu um erro')
        }
    })

}

// AUTENTICAÇÃO
exports.jwtbasic = (req,res, next) => {
    var readtoken = req.headers['pro'];

    if (!readtoken) {
        return res.json({auth: false})
    }

    jwt.verify(readtoken,'mysecrets',(err, decod) => {
        if (decod) {
            next();
            return;
        } else {
            res.json({message: err.message || 'houve um problema'})
        }
    })
}
