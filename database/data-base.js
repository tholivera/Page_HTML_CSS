const Sequelize = require ('sequelize')

const sequelize = new Sequelize("login", "root", "root", {
    host: "localhost",
    dialect: "mysql"
})

sequelize.authenticate()
.then(function(){
    console.log("Conectado")
}) . catch(function(){
    console.log("Erro de conexão")
})

module.exports = sequelize