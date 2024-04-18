<?php
// Verifica se os dados do formulário foram enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se o campo 'usuario' foi enviado
    if (isset($_POST['usuario'])) {
        // Dados do formulário
        $usuario = $_POST['usuario'];

        // Simule a recuperação de senha aqui (substitua por sua lógica real)
        // Aqui você pode enviar um e-mail de recuperação de senha para o usuário

        // Informações de e-mail
        $to = $usuario;
        $subject = 'Recuperação de senha';
        $message = 'Olá! Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:';
        $headers = 'From: seu_email@example.com' . "\r\n" .
                   'Reply-To: seu_email@example.com' . "\r\n" .
                   'X-Mailer: PHP/' . phpversion();

        // Envio do e-mail
        if (mail($to, $subject, $message, $headers)) {
            // Se o e-mail for enviado com sucesso, retorne uma resposta JSON
            echo json_encode(array("success" => true, "message" => "Um e-mail de recuperação de senha foi enviado para " . $usuario));
        } else {
            // Se houver um erro no envio do e-mail, retorne uma resposta JSON com mensagem de erro
            echo json_encode(array("success" => false, "message" => "Erro ao enviar e-mail de recuperação de senha."));
        }
    } else {
        // Se o campo 'usuario' não foi enviado, retorne uma resposta JSON com mensagem de erro
        echo json_encode(array("success" => false, "message" => "Campo de usuário não foi enviado."));
    }
}
?>