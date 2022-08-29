const btn = document.querySelector("#btn");


btn.addEventListener("click", function (event) {
 
    let formulario = document.querySelector("#formulario");
    let inputNome = formulario.nome.value;
    let inputEmail = formulario.email.value;
    let inputMensagem = formulario.mensagem.value;
    
    
    let dados = {
        nome: inputNome,
        email: inputEmail,
        mensagem: inputMensagem
    }

    fetch('http://127.0.0.1:8080/mensagens', {
        method: "POST",
        headers: { "Content-type": "application/json" }, // tipo de arquivo enviado
        body: JSON.stringify(dados)
    })
        .then(response => response.json())//transforma resposta em json
        .then(data => console.log(data)) //imprime no console a resposta


})

function validarEmail() {
    let formulario = document.querySelector("#formulario");
    let inputEmail = formulario.email.value;
    let regexEmail = /\S+@\S+\.\S+/;

    if (regexEmail.test(inputEmail)) {
        console.log("Certo")
    } else {
        console.log("Erro!")
    }
}



