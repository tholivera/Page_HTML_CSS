const express = require('express')
const cors = require('cors')
const server = express()
const mensagens = []
const cadastrar = []
const cadastroUsuario = require("../database/models/cadastroUsuario")
const mensagemUsuario = require("../database/models/mensagemUsuario")

server.use(express.json())

server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    server.use(cors())
    next()
})

//cadastro de novos usuários
server.get("/ver-cadastro", (req, res) => {
    return res.json(cadastrar)
})

server.post("/cadastrar", (req, res) => {
    cadastroUsuario.create(req.body)

    const { nome, email, senha } = req.body

    const cadastro = {
        "nome": nome,
        "email": email,
        "senha": senha
    }

    cadastrar.push(cadastro)

    return res.json(cadastrar)
})

server.put("/atualizar-cadastro/:index", (req, res) => {

    const { index } = req.params;
    const { nome, email, senha } = req.body

    const cadastro = {
        "nome": nome,
        "email": email,
        "senha": senha
    }

    cadastrar[index] = cadastro;

    return res.json(cadastrar);
})

server.delete("/apagar-cadastro/:index", (req, res) => {

    const { index } = req.params;

    cadastrar.splice(index, 1);

    return res.send("Usuário deletado com sucesso");
})

//cadastro de novas mensagens

server.get("/ver-mensagens", (req, res) => {
    return res.json(mensagens)
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

server.put("/atualizar-mensagem/:index", (req, res) => {
    const { index } = req.params;
    const { nome, email, mensagem } = req.body

    const novaMensagem = {
        "nome": nome,
        "email": email,
        "mensagem": mensagem
    }

    mensagens[index] = novaMensagem;

    return res.json(mensagens);
})

server.delete("/apagar-mensagem/:index", (req, res) => {
    const { index } = req.params;

    mensagens.splice(index, 1);

    return res.send("Mensagem deletada com sucesso");
})

server.listen(3000);