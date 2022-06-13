const Sequelize = require('sequelize');
const config = require('../config/database.config');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.cliente = require('../models/cli_cliente.model')(sequelize, Sequelize);
db.reserva = require('../models/res_reserva.model')(sequelize, Sequelize);
db.pagamento = require('../models/pag_pagamento.model')(sequelize, Sequelize);
db.acomodacao = require('../models/aco_acomodacao.model')(sequelize,Sequelize);
db.endereco = require('../models/end_endereco.model')(sequelize,Sequelize);
db.proprietario = require('../models/pro_proprietario.model')(sequelize,Sequelize);
db.imagem = require('../models/ima_imagem.model')(sequelize,Sequelize);

db.cliente.hasMany(db.reserva, {
    foreignKey: {
      name: 'cli_id',
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
})

db.reserva.hasOne(db.pagamento,{
  foreignKey: {
    name: 'res_id',
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
});

db.proprietario.hasMany(db.acomodacao, {
  as:'acomodações',
    foreignKey: {
      name: 'pro_id',
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
})

db.endereco.hasMany(db.acomodacao, {
  foreignKey: {
    name: 'end_id',
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})

db.acomodacao.hasMany(db.reserva, {
  foreignKey: {
    name: 'aco_id',
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})

db.acomodacao.hasMany(db.imagem, {
  foreignKey: {
    name: 'aco_id',
    type: Sequelize.INTEGER,
    allowNull: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  }
})

module.exports = db;
