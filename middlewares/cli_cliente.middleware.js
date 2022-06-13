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
            cli_email,cli_senha
        },
        attributes: ['cli_email','cli_senha']
    })

    bcrypt.hash(cli_senha, 8, (err,hash) => {
        console.log(hash);

        bcrypt.compare(cli_senha, Cliente.cli_senha, (err, result) => {})
    })
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        res.json(err)
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







/* exports.verificarJWT = (req,res) => {
  var readtoken = req.headers['cli'];

  if (!readtoken) {
    return res.json({auth: false})
  }

  jwt.verify(readtoken, 'mysecrets', (err, data) => {
    if (data) {
      res.json(data);
  } else if (err) {
      res.json('Ocorreu um erro')
  }
  })

} */

/* exports.JWTfindone = (req,res) => {
    var readtoken = req.headers['cli'];

    if (!readtoken) {
    return res.json({auth: false})
    }

    jwt.verify(readtoken, 'mysecrets', (err, decod) => {
    if (decod) {
        id = req.params.id;
        Cliente.findByPk(id, {
            attributes: ['cli_nome','cli_email']
        })
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
        
    } else {
        res.json({message: err.message || 'houve um problema'})
    }
        

  })    

} */

/* exports.JWTfindall = (req,res) => {
    var readtoken = req.headers['cli'];

    if (!readtoken) {
    return res.json({auth: false})
    }

    jwt.verify(readtoken, 'mysecrets', (err, decod) => {
    if (decod) {
        Cliente.findAll({
            attributes: ['cli_nome','cli_email']
        })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Ocorreu um erro.'
            })
        })
        
    } else {
        res.json({message: err.message || 'houve um problema'})
    }
        

  }) 
} */
