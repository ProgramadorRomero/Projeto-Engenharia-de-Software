<?php
// Verifica se os dados do formulário foram enviados
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Configurações de conexão com o banco de dados
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cadastro_buscapet";

// Create connection to MySQL database
$conn = mysqli_connect($servername, $username, $password, $dbname);


    // Verifica se houve algum erro na conexão
    if ($conn->connect_error) {
        die("Falha na conexão com o banco de dados: " . $conn->connect_error);
    }

// Extract form data from POST request
$nome = $_POST['nome'];
$email = $_POST['email'];
$usuario = $_POST['usuario'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT); // Hash password for security
$dataNascimento = $_POST['dataNascimento'];

// Prepare SQL statement to insert user data
$sql = "INSERT INTO usuarios (nome, email, usuario, senha, data_nascimento)
        VALUES (?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $sql);

if ($stmt) {
    mysqli_stmt_bind_param($stmt, "sssss", $nome, $email, $usuario, $senha, $dataNascimento);

    if (mysqli_stmt_execute($stmt)) {
        echo "Usuário cadastrado com sucesso!"; // Change this to a success message or redirect
    } else {
        echo "Erro ao cadastrar usuário: " . mysqli_stmt_error($stmt);
    }

    mysqli_stmt_close($stmt);
} else {
    echo "Failed to prepare SQL statement: " . mysqli_error($conn);
}

mysqli_close($conn);
}
?>