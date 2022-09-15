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

    fetch('http://127.0.0.1:3000/login', {
        method: "POST",
        headers: { "Content-type": "application/json" }, // tipo de arquivo enviado
        body: JSON.stringify(dados)
    })
        .then(response => {
            if (response.status == 200) {
                alert("OK")
            }
        })
        .catch(() => {
            response.status == 400
            alert("Erro!")
        })

})

function validarEmail() {
    let formulario = document.querySelector("#formulario-login")
    let inputEmail = formulario.email.value
    let caixaEmail = formulario.email
    let regexEmail = /\S+@\S+\.\S+/

    if (regexEmail.test(inputEmail)) {
        caixaEmail.style.border = "2px solid green"
    } else {
        caixaEmail.style.border = "2px solid red"
    }
}
