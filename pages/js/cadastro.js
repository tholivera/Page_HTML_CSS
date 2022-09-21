const btn2 = document.querySelector("#btn2")

btn2.addEventListener("click", function (event) {
    event.preventDefault()
    let regexEmail = /\S+@\S+\.\S+/
    let formulario = document.querySelector("#formulario-cadastro")
    let inputNome = formulario.nome.value
    let inputEmail = formulario.email.value
    let inputSenha = formulario.senha.value

    let dados = {
        nome: inputNome,
        email: inputEmail,
        senha: inputSenha
    }

    if (inputNome == "") {
        alert("Digite seu nome")
    }
    if (inputEmail == "") {
        alert("Digite seu e-mail")
    } else if (!regexEmail.test(inputEmail)) {
        alert("E-mail inválido")
    }
    if (inputSenha == "") {
        alert("Digite a senha")
    }
    if (inputNome != "" && inputEmail != "" && regexEmail.test(inputEmail) && inputSenha != "") {

        fetch('http://127.0.0.1:3000/cadastrar', {
            method: "POST",
            headers: { "Content-type": "application/json" }, // tipo de arquivo enviado
            body: JSON.stringify(dados)
        })
            .then(response => {
                if (response.status == 200) {
                    alert("Usuário cadastrado com sucesso!")
                    location.reload()
                }
                if (response.status == 401) {
                    alert("Erro ao cadastrar usuário!\nE-mail já cadastrado!")
                }
            })
    }

})

function validarEmail() {
    let formulario = document.querySelector("#formulario-cadastro")
    let inputEmail = formulario.email.value
    let caixaEmail = formulario.email
    let regexEmail = /\S+@\S+\.\S+/

    if (regexEmail.test(inputEmail)) {
        caixaEmail.style.border = "2px solid green"
    } else {
        caixaEmail.style.border = "2px solid red"
    }
}



