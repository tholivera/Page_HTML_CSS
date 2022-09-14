const Sequelize = require('sequelize')
const db = require("../data-base")

const cadastroUsuario = db.define('cadastro', {
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
    senha: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});


//cadastroUsuario.sync()

//cadastroUsuario.sync({alter:true})

module.exports = cadastroUsuario;