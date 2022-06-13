module.exports = (sequelize,Sequelize) => {
    const ima_imagem = sequelize.define('ima_imagem', {
        ima_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        ima_diretorio: {
            type: Sequelize.STRING(255),
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true
    })
    return ima_imagem;
}