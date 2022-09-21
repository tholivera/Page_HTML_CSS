const btn3 = document.querySelector("#btn3")

btn3.addEventListener("click", function (event) {
    event.preventDefault()
    let formulario = document.querySelector("#formulario-login")
    let inputEmail = formulario.email.value
    let inputSenha = formulario.senha.value

    let dados = {
        email: inputEmail,
        senha: inputSenha
    }

    if (inputEmail == "") {
        alert("Digite o e-mail")
    }
    if (inputSenha == "") {
        alert("Digite a senha")
    }
    if (inputEmail != "" && inputSenha != "") {
        fetch('http://127.0.0.1:3000/login', {
            method: "POST",
            headers: { "Content-type": "application/json" }, // tipo de arquivo enviado
            body: JSON.stringify(dados)
        })
            .then(response => {
                if (response.status == 200) {
                    location.href = "/pages/html/logado.html"
                }
                if (response.status == 401) {
                    location.href = "/pages/html/nao-logado.html"
                }
            })
    }
})

function validarEmail() {
    let formulario = document.querySelector("#formulario-login")
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
