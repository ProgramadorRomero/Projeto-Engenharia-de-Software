function redirecionarParaCadastroPet() {
    // Verificar se o usuário está logado (supondo que você tenha uma variável 'usuarioLogado' definida)
    var usuarioLogado = true; // Altere para a lógica real de verificação de login

    if (usuarioLogado) {
        // Usuário está logado, redirecionar para a página de cadastro de pet
        window.location.href = "cadastro_pet.html";
    } else {
        // Usuário não está logado, redirecionar para a página de login
        window.location.href = "login.html";
    }
}

// Função para carregar os dados do pet.php e exibi-los na página
function carregarDadosPets() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "pet.php", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            // Manipule os dados conforme necessário e exiba-os na página
            // Por exemplo, você pode criar elementos HTML dinamicamente para cada pet e adicioná-los ao DOM
        } else {
            console.error("Erro ao carregar dados do pet.php");
        }
    };
    xhr.onerror = function() {
        console.error("Erro na requisição AJAX para pet.php");
    };
    xhr.send();
}

// Chame a função para carregar os dados dos pets quando a página for carregada
window.onload = function() {
    carregarDadosPets();
};