module.exports = (sequelize, Sequelize) => {
    const aco_acomodacao = sequelize.define('aco_acomodacao', {

        aco_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        aco_nome: {
            type: Sequelize.STRING(100),
            allowNull: false
        },

        aco_descricao: {
            type: Sequelize.TEXT,
            allowNull: false
        },

        aco_tipo: {
            type: Sequelize.STRING(30),
            allowNull: false
        },

        aco_capacidade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        aco_total_notas: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false
        },

        aco_qtd_avaliacoes: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        aco_nota: {
            type: Sequelize.DECIMAL(2,1),
            allowNull: false
        },

        aco_capacidade_garagem: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        aco_qtd_banheiros: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        aco_qtd_quartos: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

// ---------------------------------------

        aco_aquecimento: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        aco_resfriamento: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        aco_churrasqueira: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        aco_fogao: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        
        aco_geladeira: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        aco_televisao: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        aco_internet: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        aco_piscina: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        aco_pet_friendly: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        aco_politica_cancelamento: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        aco_checkout_estendido: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },

        aco_acessibilidade: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }

    },
    {
        timestamps: false,
        freezeTableName: true
    })
    return aco_acomodacao;
}

















