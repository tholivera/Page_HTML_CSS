const btn = document.querySelector("#btn")


btn.addEventListener("click", function () {
    let formulario = document.querySelector("#formulario")
    let inputNome = formulario.nome.valu
    let inputEmail = formulario.email.value
    let inputSenha = formulario.senha.value


    let dados = {
        nome: inputNome,
        email: inputEmail,
        senha: inputSenha
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


