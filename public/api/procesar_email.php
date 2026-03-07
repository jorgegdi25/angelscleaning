<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    // Recibir datos JSON desde React (fetch)
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // Sanitizar datos y asignar a variables
    $nombre = strip_tags(trim($data["name"] ?? ''));
    $telefono = strip_tags(trim($data["phone"] ?? ''));
    $email = filter_var(trim($data["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $servicio = strip_tags(trim($data["service"] ?? ''));
    $metros = strip_tags(trim($data["sqft"] ?? ''));
    $fecha = strip_tags(trim($data["date"] ?? 'No especificada'));
    $mensaje = strip_tags(trim($data["message"] ?? ''));

    // Validar requeridos
    if (empty($nombre) || empty($telefono) || empty($email) || empty($servicio)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Please complete all required fields."]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Invalid email address."]);
        exit;
    }

    // Configuración del correo
    $destinatarios = "Alejandragamezz@gmail.com, jorgegonzalezmejia@gmail.com";
    $asunto = "Nueva Solicitud de Estimado: $servicio - $nombre";

    // Plantilla HTML profesional del correo
    $contenido_email = "
    <html>
    <head>
      <style>
        body { font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .header { background-color: #003E7C; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        h1 { margin: 0; font-size: 24px; }
        .content { padding: 20px; background-color: #f9f9f9; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        .label { font-weight: bold; width: 35%; color: #003E7C; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #888; }
      </style>
    </head>
    <body>
      <div class='container'>
        <div class='header'>
          <h1>Nueva Solicitud de Servicio</h1>
          <p>Angels Cleaning Services</p>
        </div>
        <div class='content'>
          <p>Hola Equipo,</p>
          <p>Han recibido una nueva solicitud de estimado desde la página web. Aquí están los detalles:</p>
          <table>
            <tr><td class='label'>Nombre del Cliente:</td><td>$nombre</td></tr>
            <tr><td class='label'>Teléfono:</td><td>$telefono</td></tr>
            <tr><td class='label'>Correo Electrónico:</td><td>$email</td></tr>
            <tr><td class='label'>Tipo de Servicio:</td><td>$servicio</td></tr>
            <tr><td class='label'>Tamaño Aproximado:</td><td>$metros</td></tr>
            <tr><td class='label'>Fecha Preferida:</td><td>$fecha</td></tr>
            <tr><td class='label'>Detalles Adicionales:</td><td>$mensaje</td></tr>
          </table>
          <p style='margin-top: 20px;'><strong>Nota:</strong> El usuario ya ha sido redirigido a la pantalla de pago seguro (Bizum/IBAN).</p>
        </div>
        <div class='footer'>
          <p>Este mensaje fue generado automáticamente por el sistema web de Angels Cleaning App.</p>
        </div>
      </div>
    </body>
    </html>
    ";

    // Cabeceras para enviar HTML
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $nombre <$email>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";

    // Intentar Enviar
    if (mail($destinatarios, $asunto, $contenido_email, $headers)) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Request sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Failed to send email on server."]);
    }

} else {
    http_response_code(403);
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
