const Sequelize = require('sequelize')
const db = require("../data-base")

const mensagemUsuario = db.define('mensagem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    mensagem: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});


//mensagemUsuario.sync()

//mensagemUsuario.sync({alter:true})

module.exports = mensagemUsuario;