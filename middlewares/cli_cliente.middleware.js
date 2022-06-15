const db = require('../models');
const Cliente = db.cliente;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// LOGIN
// SEM CRIPTOGRAFIA
exports.login = (req,res) => {
    const {cli_email, cli_senha} = req.body;

    Cliente.findOne({
        where: {
            cli_email,cli_senha
        },
        attributes: ['cli_email','cli_senha']
    })

    .then((data) => {
        if( cli_email == data.cli_email && cli_senha == data.cli_senha ) {
            const token = jwt.sign({cli_email, cli_senha}, 'mysecrets', {
                expiresIn: 60
            })

            return res.json({auth: true, token: token});

        } else {
            res.status(500).json({message: 'login inválido!'});
        }
        
    })
    .catch(() => {
        res.json('ocorreu um erro')
    })
}

// LOGOUT
exports.logout = (req,res) => {
    res.json({ auth: false, token: null })
}

// VALIDAÇÃO
exports.validate = (req,res) => {
    var readtoken = req.headers['cli'];

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
    var readtoken = req.headers['cli'];

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

exports.testelogin = (req,res) => {
    const {cli_email, cli_senha} = req.body;

    Cliente.findOne({
        where: {
            cli_email, cli_senha
        },
        attributes: ['cli_email','cli_senha']
    })

    // https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
    .then((data) => {
        if (cli_email == data.cli_email) {
            const validPassword = bcrypt.compare(cli_senha,data.cli_senha);
            if(validPassword){
                const token = jwt.sign({cli_email,cli_senha}, 'mysecrets', {
                    expiresIn: 60
                })
                
                // res.json({auth: true, token: token, message: "acesso válido"});
                
                return res.json({auth: true, token: token});
            } else {
                res.status(400).json({ error: "senha inválida" });
            }
        } else {
            res.json('usuário não existe')
        }
    })
    .catch(err => {
        res.json({err: 'ocorreu um erro'})
    })
}
