const express = require('express')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const server = express()
const { aAdmin, eAdmin } = require("./middleware/autenticacao")
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

    cadastroUsuario.create(cadastro)

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

//autenticação
server.post("/login", async (req, res) => {

    //$2b$10$rnFmQ3LLrBeJ55v29ZqwbeB9FLUZ5BepPXlEvN1gzi3DxfQcT1TFG
    const encontrarUsuario = await cadastroUsuario.findOne({
        attributes: ["id", "nome", "email", "senha"],
        where: {
            email: req.body.email
        }
    })

    if (encontrarUsuario == null) {
        return res.status(400).json({
            error: true,
            mensagem: "Usuário ou senha incorreta!!"
        })
    }

    if (!(await bcrypt.compare(req.body.senha, encontrarUsuario.senha))) {
        return res.status(400).json({
            error: true,
            mensagem: "Deu errado!"
        })
    }

    let token = jwt.sign({ id: encontrarUsuario.id }, "D658FDS6584GFXV26DFCDDS5", {
        expiresIn: "365d"
    })


    return res.json({
        mensagem: "Deu booom",
        token
    })


})

//rota restrita
server.get("/ver", eAdmin, async (req, res) => {
    return res.json({
        erro: false,
        mensagem: "Rota de teste",
        ulala: req.userID
    })
})

//cadastroUsuario.sync({alter:true})
//mensagemUsuario.sync({alter:true})


server.listen(3000);