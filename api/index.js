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
server.get("/ver-cadastro", async (req, res) => {

    const cadastro = await cadastroUsuario.findAll()

    return res.json(cadastro)
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


server.put("/atualizar-cadastro/:index", async (req, res) => {

    const { index } = req.params;

    const { nome, email, senha } = req.body

    const atualizar = await cadastroUsuario.findByPk(index);

    atualizar.nome = nome
    atualizar.email = email
    atualizar.senha = senha

    atualizar.save();

    return res.json(atualizar);
})

server.delete("/apagar-cadastro/:index", (req, res) => {

    const { index } = req.params;

    cadastroUsuario.destroy({ where: { id: index } }); // deletar no db

    //cadastrar.splice(index, 1); // deletar fora do db

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

server.put("/atualizar-mensagem/:index", async (req, res) => {

    const { index } = req.params;

    const { nome, email, mensagem } = req.body

    const atualizar = await mensagemUsuario.findByPk(index);

    atualizar.nome = nome
    atualizar.email = email
    atualizar.mensagem = mensagem

    atualizar.save();

    return res.json(atualizar);
})

server.delete("/apagar-mensagem/:index", (req, res) => {

    const { index } = req.params;

    cadastroUsuario.destroy({ where: { id: index } }); // deletar no db

    //cadastrar.splice(index, 1); // deletar fora do db

    return res.send("Mensagem deletada com sucesso");
})

//cadastroUsuario.sync({alter:true})
//mensagemUsuario.sync({alter:true})


server.listen(3000);