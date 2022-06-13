const jwt = require('jsonwebtoken');

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
