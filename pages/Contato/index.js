const btn = document.querySelector("#btn");

btn.addEventListener("click", function (event) {
    
    let formulario = document.querySelector("#formulario");
    let nome = formulario.nome.value;
    let email = formulario.email.value;
    let mensagem = formulario.mensagem.value;
    
    body = {
        nome: nome,
        email: email,
        mensagem: mensagem
    }

    let request = new XMLHttpRequest(); //objeto que permite fazer requisições http
    request.open("POST", "http://127.0.0.1:8080/mensagens", true); //conectar front com back
    request.setRequestHeader("Content-type", "application/json"); //informando tipo de arquivo que será recebido
    request.send(JSON.stringify(body)); //enviar requisição post já convertendo os dados para json

    request.onload = function () {
        console.log(this.responseText)
    } // imprime no console os dados enviados


})

alert("Mensagem enviada com sucesso!")