<?php
session_start();

// Verifica se os dados do formulário foram enviados
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Configurações de conexão com o banco de dados
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cadastro_buscapet";

    // Cria a conexão com o banco de dados
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    // Verifica se houve algum erro na conexão
    if ($conn->connect_error) {
        die(json_encode(array("success" => false, "message" => "Falha na conexão com o banco de dados: " . $conn->connect_error)));
    }

    // Extrai dados do formulário POST
    $usuario = $_POST['usuario'];
    $senha = $_POST['senha'];

    // Consulta SQL para verificar se as credenciais estão corretas
    $sql = "SELECT * FROM usuarios WHERE usuario = '$usuario' OR email = '$usuario'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Usuário encontrado, verificar senha
        $row = $result->fetch_assoc();
        if (password_verify($senha, $row['senha'])) {
            // Senha correta, login bem-sucedido
            $_SESSION["success_message"] = "Login bem-sucedido.";
            header("Location: cadastroPet.html");
            exit();
        } else {
            // Senha incorreta
            $_SESSION["error_message"] = "Senha incorreta.";
            header("Location: login.html");
            exit();
        }
    } else {
        // Usuário não encontrado
        $_SESSION["error_message"] = "Usuário não encontrado. Se precisar, clique em 'Esqueceu sua senha?' para recuperá-la.";
        header("Location: login.html");
        exit();
    }

    // Fecha a conexão com o banco de dados
    $conn->close();
}
?>

