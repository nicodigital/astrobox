<?php

function debug($arr, $die = false){
    echo "<pre class='debug'>";
    $out = print_r($arr, true);
      echo htmlentities($out);
    echo "</pre>";

  if($die){
      die();
  }
}

if ($_POST) {
    
        /* Mensajes */
        $success_mssg   = "Tu mensaje ha sido enviado exitosamente. Gracias.";               
        $error_mssg     = "Se ha producido un error. Por favor, compruebe su configuración de correo electrónico PHP."; 
        $short_mssg     = "Mensaje demasiado corto! Por favor, introduzca algo.";                       
        $empty_fields   = "Los campos de entrada están vacíos. Por favor, introduzca algo.";                  
        $name_mssg      = "El nombre es demasiado corto o vacío! Por favor, introduzca algo.";              
        $email_mssg     = "Por favor introduzca una dirección de correo electrónico válida";                                       // Valid email

        //Check $_POST vars are set, exit if any missing
        if (!isset($_POST["name"]) || !isset($_POST["email"]) || !isset($_POST["phone"]) || !isset($_POST["message"])) {
            $output = json_encode(array('type' => 'error', 'text' => $empty_fields));
            die($output);
        }

        // Use FILTER_SANITIZE_FULL_SPECIAL_CHARS para PHP 8.0 en adelante
        $name        = filter_var($_POST["name"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $email       = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
        $phone       = filter_var($_POST["phone"], FILTER_SANITIZE_NUMBER_INT);
        $message     = filter_var($_POST["message"], FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $message     = htmlspecialchars($message);
        // $news     = $_POST["news"];

        //Additional php validation
        // If length is less than  it will throw an HTTP error.
        if ( strlen($name) < 4 ) {
            $output = json_encode(array('type' => 'error', 'text' => $name_mssg));
            die($output);
        }

        //Check Email
        if ( !filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
            $output = json_encode(array('type' => 'error', 'text' => $email_mssg));
            die($output);
        }

        //Check Message
        if ( strlen($message) < 16 ) {
            $output = json_encode(array('type' => 'error', 'text' => $short_mssg));
            die($output);
        }
        

        $message = "Nombre: $name <br><br>
                    Email: $email <br><br> 
                    Tel: $phone <br><br> 
                    Consulta: $message";

        include 'phpmailer.php';


}