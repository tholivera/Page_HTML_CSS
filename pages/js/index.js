const btn = document.querySelector("#btn")
const btn2 = document.querySelector("#btn2")
const btn3 = document.querySelector("#btn3")

btn.addEventListener("click", function () {
    let formulario = document.querySelector("#formulario")
    let inputNome = formulario.nome.value
    let inputEmail = formulario.email.value
    let inputMensagem = formulario.mensagem.value

    let dados = {
        nome: inputNome,
        email: inputEmail,
        mensagem: inputMensagem
    }

    fetch('http://127.0.0.1:3000/mensagens', {
        method: "POST",
        headers: { "Content-type": "application/json" }, // tipo de arquivo enviado
        body: JSON.stringify(dados)
    })
        .then(response => {
            if (response.status == 201) {
                alert("Mensagem enviada com sucesso!")
            }
        })
        .catch(() => {
            alert("Erro!")
        })


})

btn2.addEventListener("click", function () {
    let formulario = document.querySelector("#formulario")
    let inputNome = formulario.nome.value
    let inputEmail = formulario.email.value
    let inputMensagem = formulario.mensagem.value

    let dados = {
        nome: inputNome,
        email: inputEmail,
        mensagem: inputMensagem
    }

    fetch('http://127.0.0.1:3000/cadastrar', {
        method: "POST",
        headers: { "Content-type": "application/json" }, // tipo de arquivo enviado
        body: JSON.stringify(dados)
    })
        .then(response => {
            if (response.status == 201) {
                alert("Mensagem enviada com sucesso!")
            }
        })
        .catch(() => {
            alert("Erro!")
        })


})

btn3.addEventListener("click", function () {
    let formulario = document.querySelector("#formulario")
    let inputNome = formulario.nome.value
    let inputEmail = formulario.email.value
    let inputMensagem = formulario.mensagem.value

    let dados = {
        nome: inputNome,
        email: inputEmail,
        mensagem: inputMensagem
    }

    fetch('http://127.0.0.1:3000/login', {
        method: "POST",
        headers: { "Content-type": "application/json" }, // tipo de arquivo enviado
        body: JSON.stringify(dados)
    })
        .then(response => {
            if (response.status == 201) {
                alert("Mensagem enviada com sucesso!")
            }
        })
        .catch(() => {
            alert("Erro!")
        })


})

function validarEmail() {
    let formulario = document.querySelector("#formulario")
    let inputEmail = formulario.email.value
    let caixaEmail = formulario.email
    let regexEmail = /\S+@\S+\.\S+/

    if (regexEmail.test(inputEmail)) {
        caixaEmail.style.border = "2px solid green"
    } else {
        caixaEmail.style.border = "2px solid red"
    }
}


