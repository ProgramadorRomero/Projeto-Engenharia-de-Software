let btn = document.querySelector('#verSenha')
let btnConfirm = document.querySelector('#verConfirmSenha')

let nome = document.querySelector('#nome')
let labelNome = document.querySelector('#labelNome')
let validNome = false

let email = document.querySelector('#email')
let labelEmail = document.querySelector('#labelEmail')
let validEmail = false

let usuario = document.querySelector('#usuario')
let labelUsuario = document.querySelector('#labelUsuario')
let validUsuario = false

let senha = document.querySelector('#senha')
let labelSenha = document.querySelector('#labelSenha')
let validSenha = false

let confirmSenha = document.querySelector('#confirmSenha')
let labelConfirmSenha = document.querySelector('#labelConfirmSenha')
let validConfirmSenha = false

let dataNascimento = document.querySelector('#dataNascimento');
let labelDataNascimento = document.querySelector('#labelDataNascimento');
let validDataNascimento = false;

let msgError = document.querySelector('#msgError')
let msgSuccess = document.querySelector('#msgSuccess')

nome.addEventListener('keyup', () => {
  if(nome.value.length <= 2){
    labelNome.setAttribute('style', 'color: red')
    labelNome.innerHTML = 'Nome *Insira no minimo 3 caracteres'
    nome.setAttribute('style', 'border-color: red')
    validNome = false
  } else {
    labelNome.setAttribute('style', 'color: green')
    labelNome.innerHTML = 'Nome'
    nome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

email.addEventListener('keyup', () => {
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.value)) {
    labelEmail.setAttribute('style', 'color: red');
    labelEmail.innerHTML = 'Email *Insira um email válido';
    email.setAttribute('style', 'border-color: red');
    validEmail = false;
  } else {
    labelEmail.setAttribute('style', 'color: green');
    labelEmail.innerHTML = 'Email';
    email.setAttribute('style', 'border-color: green');
    validEmail = true;
  }
})

usuario.addEventListener('keyup', () => {
  if(usuario.value.length <= 4){
    labelUsuario.setAttribute('style', 'color: red')
    labelUsuario.innerHTML = 'Usuário *Insira no minimo 5 caracteres'
    usuario.setAttribute('style', 'border-color: red')
    validUsuario = false
  } else {
    labelUsuario.setAttribute('style', 'color: green')
    labelUsuario.innerHTML = 'Usuário'
    usuario.setAttribute('style', 'border-color: green')
    validUsuario = true
  }
})

senha.addEventListener('keyup', () => {
  if(senha.value.length <= 5){
    labelSenha.setAttribute('style', 'color: red')
    labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres'
    senha.setAttribute('style', 'border-color: red')
    validSenha = false
  } else {
    labelSenha.setAttribute('style', 'color: green')
    labelSenha.innerHTML = 'Senha'
    senha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

confirmSenha.addEventListener('keyup', () => {
  if(senha.value != confirmSenha.value){
    labelConfirmSenha.setAttribute('style', 'color: red')
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem'
    confirmSenha.setAttribute('style', 'border-color: red')
    validConfirmSenha = false
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green')
    labelConfirmSenha.innerHTML = 'Confirmar Senha'
    confirmSenha.setAttribute('style', 'border-color: green')
    validConfirmSenha = true
  }
})

dataNascimento.addEventListener('change', () => {
  if (!dataNascimento.value) {
    labelDataNascimento.setAttribute('style', 'color: red');
    labelDataNascimento.innerHTML = 'Data de Nascimento *Insira sua data de nascimento';
    validDataNascimento = false;
  } else {
    labelDataNascimento.setAttribute('style', 'color: green');
    labelDataNascimento.innerHTML = 'Data de Nascimento';
    validDataNascimento = true;
  }
});

function verificarCamposVazios() {
  if (nome.value === "" || email.value === "" || usuario.value === "" || senha.value === "" || confirmSenha.value === "" || dataNascimento.value === "") {
    // Se algum campo estiver vazio, altere a borda de todas as caixas de entrada para vermelho
    nome.style.borderColor = "red";
    email.style.borderColor = "red";
    usuario.style.borderColor = "red";
    senha.style.borderColor = "red";
    confirmSenha.style.borderColor = "red";
    dataNascimento.style.borderColor = "red";
    
    return true; // Retorna true indicando que há campos vazios
  }
  
  return false; // Retorna false indicando que todos os campos estão preenchidos
}


function cadastrar() {
  if (validNome && validEmail && validUsuario && validSenha && validConfirmSenha) {
    // If all fields are valid, proceed with registration
    if (!verificarCamposVazios()) { // Check for empty fields again
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "cadastro.php", true); // Replace with your registration script
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      // Prepare data to send (consider using FormData for easier handling)
      let data = `nome=${nome.value}&email=${email.value}&usuario=${usuario.value}&senha=${senha.value}&dataNascimento=${dataNascimento.value}`;

      xhr.onload = function() {
        if (xhr.status === 200) {
          // Registration successful
          msgSuccess.setAttribute('style', 'display: block');
          msgSuccess.innerHTML = 'Cadastro realizado com sucesso!';
          msgError.setAttribute('style', 'display: none');
          msgError.innerHTML = '';

          setTimeout(() => {
            window.location.href = 'login.html';
          }, 2000);
        } else {
          // Registration failed
          msgError.setAttribute('style', 'display: block');
          msgError.innerHTML = 'Erro ao cadastrar usuário. Tente novamente.';
          msgSuccess.innerHTML = '';
          msgSuccess.setAttribute('style', 'display: none');
        }
      };

      xhr.onerror = function() {
        console.error("Erro na requisição AJAX");
      };

      xhr.send(data);
    }
  } else {
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = 'Preencha todos os campos corretamente antes de cadastrar.';
    msgSuccess.innerHTML = '';
    msgSuccess.setAttribute('style', 'display: none');
  }
}

if (btn && btnConfirm) {
  btn.addEventListener('click', ()=>{
    let inputSenha = document.querySelector('#senha')
    
    if(inputSenha.getAttribute('type') == 'password'){
      inputSenha.setAttribute('type', 'text')
    } else {
      inputSenha.setAttribute('type', 'password')
    }
  })

  btnConfirm.addEventListener('click', ()=>{
    let inputConfirmSenha = document.querySelector('#confirmSenha')
    
    if(inputConfirmSenha.getAttribute('type') == 'password'){
      inputConfirmSenha.setAttribute('type', 'text')
    } else {
      inputConfirmSenha.setAttribute('type', 'password')
    }
  })
}