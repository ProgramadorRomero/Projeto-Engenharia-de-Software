function cadastrarPet() {
    // Extrair os valores dos campos do formulário
    let nomePet = document.getElementById("nomePet").value;
    let estadoPet = document.getElementById("estadoPet").value;
    let tipoPet = document.getElementById("tipoPet").value;
    let outroTipoPet = document.getElementById("outroTipoPet").value;
    let generoPet = document.getElementById("generoPet").value;
    let enderecoUltimaVez = document.getElementById("enderecoUltimaVez").value;
    let dataHoraOcorrido = document.getElementById("dataHoraOcorrido").value;
    let nomeContato = document.getElementById("nomeContato").value;
    let telefoneContato = document.getElementById("telefoneContato").value;
    let emailContato = document.getElementById("emailContato").value;
    let redeSocialContato = document.getElementById("redeSocialContato").value;

    // Verificar se o tipo de animal é "Outro" e definir o valor do campo "Outro" adequadamente
    if (tipoPet === "outro") {
        tipoPet = outroTipoPet;
    }

    // Criar um objeto FormData para enviar os dados do formulário via AJAX
    let formData = new FormData();
    formData.append("nomePet", nomePet);
    formData.append("estadoPet", estadoPet);
    formData.append("tipoPet", tipoPet);
    formData.append("generoPet", generoPet);
    formData.append("enderecoUltimaVez", enderecoUltimaVez);
    formData.append("dataHoraOcorrido", dataHoraOcorrido);
    formData.append("nomeContato", nomeContato);
    formData.append("telefoneContato", telefoneContato);
    formData.append("emailContato", emailContato);
    formData.append("redeSocialContato", redeSocialContato);

    // Enviar os dados do formulário via AJAX para o PHP
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "pet.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Sucesso ao cadastrar pet
            console.log(xhr.responseText);
            // Faça algo após cadastrar o pet, se necessário
        } else {
            // Erro ao cadastrar pet
            console.error("Erro ao cadastrar pet: " + xhr.responseText);
        }
    };
    xhr.onerror = function() {
        console.error("Erro na requisição AJAX");
    };
    xhr.send(formData);
}

function checkOutro(selectElement) {
    // Verificar se o valor selecionado é "outro" e mostrar/esconder o campo "Especifique" conforme necessário
    let outroContainer = document.getElementById("outroContainer");
    if (selectElement.value === "outro") {
        outroContainer.style.display = "block";
    } else {
        outroContainer.style.display = "none";
    }
}
