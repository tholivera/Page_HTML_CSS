const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const server = express()
const cadastroUsuario = require("../database/models/cadastroUsuario")
const mensagemUsuario = require("../database/models/mensagemUsuario")
const mensagens = []
const cadastrar = []

server.use(express.json())

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    server.use(cors())
    next()
})

//cadastro de novos usuários
server.get("/ver-cadastro", async (req, res) => {

    const cadastro = await cadastroUsuario.findAll()

    return res.json(cadastro)
})

server.post("/cadastrar", async (req, res) => {

    const { nome, email } = req.body

    const senha = await bcrypt.hash(req.body.senha, 10)

    const cadastro = {
        "nome": nome,
        "email": email,
        "senha": senha
    }

    const encontrarEmail = await cadastroUsuario.findOne({
        attributes: ["email"],
        where: {
            email: email
        }
    })

    if (encontrarEmail == null) {

        cadastroUsuario.create(cadastro)

        cadastrar.push(cadastro)

        return res.json(cadastrar)

    } else {
        return res.status(401).json({
            error: true,
            mensagem: "Erro: Usuário já cadastrado!"
        })
    }





})


server.put("/atualizar-cadastro/:id", async (req, res) => {

    const { id } = req.params;

    const { nome, email } = req.body

    const senha = await bcrypt.hash(req.body.senha, 10)

    const atualizar = await cadastroUsuario.findByPk(id);

    atualizar.nome = nome
    atualizar.email = email
    atualizar.senha = senha

    atualizar.save();

    return res.json(atualizar);
})

server.delete("/apagar-cadastro/:id", (req, res) => {

    const { id } = req.params;

    cadastroUsuario.destroy({ where: { id: id } }); // deletar no db

    //cadastrar.splice(id, 1); // deletar fora do db

    return res.send("Cadastro deletado com sucesso");
})

//cadastro de novas mensagens

server.get("/ver-mensagens", async (req, res) => {

    const mensagem = await mensagemUsuario.findAll()

    return res.json(mensagem)
})

server.post("/mensagens", (req, res) => {

    mensagemUsuario.create(req.body)

    const { nome, email, mensagem } = req.body

    const novaMensagem = {
        "nome": nome,
        "email": email,
        "mensagem": mensagem
    }

    mensagens.push(novaMensagem)

    return res.json(mensagens)
})

server.put("/atualizar-mensagem/:id", async (req, res) => {

    const { id } = req.params;

    const { nome, email, mensagem } = req.body

    const atualizar = await mensagemUsuario.findByPk(id);

    atualizar.nome = nome
    atualizar.email = email
    atualizar.mensagem = mensagem

    atualizar.save();

    return res.json(atualizar);
})

server.delete("/apagar-mensagem/:id", (req, res) => {

    const { id } = req.params;

    mensagemUsuario.destroy({ where: { id: id } }); // deletar no db

    //cadastrar.splice(index, 1); // deletar fora do db

    return res.send("Mensagem deletada com sucesso");
})

//autenticação
server.post("/login", async (req, res) => {

    const encontrarUsuario = await cadastroUsuario.findOne({
        attributes: ["id", "nome", "email", "senha"],
        where: {
            email: req.body.email
        }
    })

    if (encontrarUsuario == null) {
        return res.status(401).json({
            error: true,
            mensagem: "Usuário ou senha incorreta!!"
        })
    }

    if (!(await bcrypt.compare(req.body.senha, encontrarUsuario.senha))) {
        return res.status(401).json({
            error: true,
            mensagem: "Usuário ou senha incorreta!!"
        })
    }


    return res.send("Logado com sucesso!")

})


//cadastroUsuario.sync({alter:true})
//mensagemUsuario.sync({alter:true})


server.listen(3000);