<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "cadastro_buscapet";

    // Create connection to MySQL database
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    // Check connection
    if (!$conn) {
        die("Falha ao conectar ao MySQL: " . mysqli_connect_error());
    }

    // Extrair dados do formulário do pedido POST
    $petName = $_POST['nomePet'] ?? '';
    $petState = $_POST['estadoPet'] ?? '';
    $petType = $_POST['tipoPet'] ?? '';
    $petGender = $_POST['generoPet'] ?? ''; // Alterado para 'generoPet'
    $lastSeenAddress = $_POST['enderecoUltimaVez'] ?? '';
    $incidentDateTime = $_POST['dataHoraOcorrido'] ?? '';
    $contactName = $_POST['nomeContato'] ?? '';
    $contactPhone = $_POST['telefoneContato'] ?? '';
    $contactEmail = $_POST['emailContato'] ?? ''; // Corrigido o nome do campo
    $contactSocialMedia = $_POST['redeSocialContato'] ?? '';

    // Verificar se o tipo de animal é "Outro" e definir o valor do campo "Outro" adequadamente
    if ($petType === "outro" && isset($_POST['outroTipoPet'])) {
        $petType = $_POST['outroTipoPet'];
    }

    // Prepare and execute SQL statement to insert pet data
    $sql = "INSERT INTO pets (pet_name, pet_state, pet_type, pet_gender, last_seen_address, incident_datetime, contact_name, contact_phone, contact_email, contact_social_media)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "ssssssssss", $petName, $petState, $petType, $petGender, $lastSeenAddress, $incidentDateTime, $contactName, $contactPhone, $contactEmail, $contactSocialMedia);

        if (mysqli_stmt_execute($stmt)) {
            echo "Informações do pet inseridas com sucesso no banco de dados.";
        } else {
            echo "Falha ao inserir dados do pet: " . mysqli_stmt_error($stmt);
        }

        mysqli_stmt_close($stmt);
    } else {
        echo "Falha ao preparar a declaração SQL: " . mysqli_error($conn);
    }

    mysqli_close($conn);
}
?>
