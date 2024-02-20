<?php

//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'phpMailer/Exception.php';
require 'phpMailer/PHPMailer.php';
require 'phpMailer/SMTP.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {

    // Message Server settings
    $mail->CharSet = "UTF-8";
    $mail->Encoding = 'base64';
    $mail->SMTPDebug = 0;
    // $mail->SMTPDebug = 3;
    $mail->isSMTP();

    // SMTP GMAIL
    $mail->Host       = 'mail.arsistemas.com.uy';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@arsistemas.com.uy';    
    $mail->Password   = '^#i&4^Q9_c3L';          
    
    // SMTP I+D
    // $mail->Host       = 'testing.idmedia.uy';
    // $mail->SMTPAuth   = true;
    // $mail->Username   = 'send@testing.idmedia.uy';    
    // $mail->Password   = 'v67abHu5A@@p';          
    
    $mail->SMTPSecure = 'ssl';                       //Enable implicit TLS encryption
    // $mail->SMTPSecure = 'tls';                    //Enable implicit TLS encryption
    $mail->Port       = 465;

    // Establecer el idioma del correo electrónico
    $mail->setLanguage('es'); // Cambia 'es' por el código del idioma que desees

    $subject          = "Consulta — AR Sistemas";

    //Recipients
    $mail->setFrom( 'info@arsistemas.com.uy' );

    $mail->addAddress( 'info@arsistemas.com.uy' );     //Add a recipient
    //$mail->addAddress('ellen@example.com');   //Add a recipient

    //Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = '=?UTF-8?B?' . base64_encode( $subject ) . '?='; // Codificación UTF-8
    
    $messageHtml = nl2br($message);
    $mail->Body    = $messageHtml;

    /*//////////////////////////////// OUTPUT ///////////////////////////////////*/

    if( !$mail->send() ){

        echo 'Mailer Error: ' . $mail->ErrorInfo;

    }else{

        $output = json_encode(array('type' => 'message', 'text' => "Tu mensaje ha sido enviado exitosamente. Gracias." ) );
        die($output);

    }

} catch (Exception $e) {

    // $output = json_encode(array('type' => 'error', 'text' => $error_mssg ) );
    $output = json_encode(array('type' => 'error', 'text' => $mail->ErrorInfo ) );
    die($output);

}