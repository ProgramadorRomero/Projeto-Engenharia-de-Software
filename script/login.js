let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', ()=>{
  let inputSenha = document.querySelector('#senha')
  
  if(inputSenha.getAttribute('type') == 'password'){
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

function entrar() {
  let usuario = document.querySelector('#usuario').value;
  let senha = document.querySelector('#senha').value;
  let msgError = document.querySelector('#msgError');

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "login.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function() {
    if (xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      if (response.success) {
        // Login bem-sucedido, redireciona para a página de cadastroPet
        window.location.href = 'cadastroPet.html';
      } else {
        // Se não for bem-sucedido, exibe mensagem de erro na tela de login
        msgError.textContent = response.message;
        msgError.style.display = 'block'; // Exibe a mensagem de erro
      }
    } else {
      // Erro na requisição AJAX
      console.error("Erro na requisição AJAX");
    }
  };

  xhr.onerror = function() {
    console.error("Erro na requisição AJAX");
  };

  xhr.send("usuario=" + usuario + "&senha=" + senha);
}


function esqueceuSenha() {
  let usuario = document.querySelector('#usuario').value;
  let msgError = document.querySelector('#msgError');

  // Verifica se o campo de usuário foi preenchido
  if (usuario == '') {
    msgError.textContent = 'Por favor, insira seu nome de usuário ou e-mail.';
    msgError.style.display = 'block';
    return false;
  }

  // Envia uma solicitação AJAX para o servidor PHP
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "esqueceu_senha.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onload = function() {
    if (xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      if (response.success) {
        // Exibe a mensagem de sucesso retornada pelo servidor
        msgError.textContent = response.message;
        msgError.style.color = 'green';
      } else {
        // Exibe a mensagem de erro retornada pelo servidor
        msgError.textContent = response.message;
        msgError.style.color = 'red';
      }
      msgError.style.display = 'block';
    } else {
      // Erro na requisição AJAX
      console.error("Erro na requisição AJAX");
    }
  };

  xhr.onerror = function() {
    console.error("Erro na requisição AJAX");
  };

  // Envia os dados do formulário como parâmetros POST
  xhr.send("usuario=" + usuario);
}


// Adicione essa função para verificar se a senha deve ser lembrada ou esquecida
function lembrarSenha() {
  const lembrarSenhaCheckbox = document.getElementById('lembrarSenhaCheckbox');
  
  lembrarSenhaCheckbox.addEventListener('change', function() {
    const senha = document.getElementById('senha').value;
    
    if (lembrarSenhaCheckbox.checked) {
      // Se o checkbox estiver marcado, armazene a senha no localStorage
      localStorage.setItem('lembrarSenha', senha);
    } else {
      // Se o checkbox estiver desmarcado, remova a senha do localStorage
      localStorage.removeItem('lembrarSenha');
    }
  });
}

// Adicione essa função para verificar se a senha deve ser lembrada ao carregar a página
function verificarSenhaLembrada() {
  const senhaLembrada = localStorage.getItem('lembrarSenha');
  const lembrarSenhaCheckbox = document.getElementById('lembrarSenhaCheckbox');
  
  if (senhaLembrada) {
    // Se houver uma senha armazenada, marque o checkbox e preencha o campo de senha
    lembrarSenhaCheckbox.checked = true;
    document.getElementById('senha').value = senhaLembrada;
  } else {
    // Se não houver senha armazenada, desmarque o checkbox
    lembrarSenhaCheckbox.checked = false;
  }
}

// Chame as funções ao carregar a página
window.onload = function() {
  verificarSenhaLembrada();
  lembrarSenha();
};

function pet() {
  // Verifica se o usuário está logado
  const userLogado = JSON.parse(localStorage.getItem('userLogado'));
  if (userLogado) {
    // Se o usuário estiver logado, redirecione para a página do pet
    window.location.href = 'cadastroPet.html';
  } else {
    // Se o usuário não estiver logado, redirecione para a página de login
    window.location.href = 'login.html';
  }
}