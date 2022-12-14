const btn = document.querySelector("#btn")

btn.addEventListener("click", function (event) {
    event.preventDefault()
    let regexEmail = /\S+@\S+\.\S+/
    let formulario = document.querySelector("#formulario")
    let inputNome = formulario.nome.value
    let inputEmail = formulario.email.value
    let inputMensagem = formulario.mensagem.value

    let dados = {
        nome: inputNome,
        email: inputEmail,
        mensagem: inputMensagem
    }
    if (inputNome == "") {
        alert("Digite seu nome")
    }
    if (inputEmail == "") {
        alert("Digite seu e-mail")
    } else if (!regexEmail.test(inputEmail)) {
        alert("E-mail inválido")
    }
    if (inputMensagem == "") {
        alert("Digite a mensagem")
    }
    if (inputNome != "" && inputEmail != "" && regexEmail.test(inputEmail) && inputMensagem != "") {
        fetch('http://127.0.0.1:3000/mensagens', {
            method: "POST",
            headers: { "Content-type": "application/json" }, // tipo de arquivo enviado
            body: JSON.stringify(dados)
        })
            .then(response => {
                if (response.status == 200) {
                    alert("Mensagem enviada com sucesso!")
                    location.reload()
                }
                if (response.status == 401) {
                    alert("Erro ao enviar mensagem!")
                }
            })
    }

})

function validarEmail() {
    let formulario = document.querySelector("#formulario")
    let inputEmail = formulario.email.value
    let caixaEmail = formulario.email
    let span = document.querySelector(".span")
    let regexEmail = /\S+@\S+\.\S+/

    if (regexEmail.test(inputEmail)) {
        caixaEmail.style.border = "none"
        span.style.display = "none"

    } else {
        caixaEmail.style.border = "2px solid red"
        span.style.display = "block"
    }
}