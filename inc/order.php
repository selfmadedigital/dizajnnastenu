<?php
	require_once("db.php");
	header('Content-Type: application/json; charset=utf-8');
	$db->query("INSERT INTO orders (product_name, width, height, quantity, finalisation_id, installation, material_id, shipping_id, name, surname, email, telephone, address, psc, city, shipping_address, shipping_psc, shipping_city, additional_info, attachment, total_price, created, status) VALUES ('".$_POST['product']."','".$_POST['width']."','".$_POST['height']."','".$_POST['quantity']."','".$_POST['finalisation_id']."','".$_POST['installation']."','".$_POST['material_id']."','".$_POST['shipping_id']."','".$_POST['name']."','".$_POST['surname']."','".$_POST['email']."','".$_POST['telephone']."','".$_POST['address']."','".$_POST['psc']."','".$_POST['city']."','".$_POST['shipping_address']."','".$_POST['shipping_psc']."','".$_POST['shipping_city']."','".$_POST['additional_info']."','".$_POST['attachment']."','".$_POST['total_price']."',NOW(),'3')");
	
// Import PHPMailer classes into the global namespace
// // These must be at the top of your script, not inside a function
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;

// //Load Composer's autoloader
// require 'phpmailer/src/PHPMailer.php';
// require 'phpmailer/src/Exception.php';
// require 'phpmailer/src/SMTP.php';

// $mail = new PHPMailer(true);   
// $mail->setLanguage('sk', 'phpmailer/language/phpmailer.lang-sk.php');                           // Passing `true` enables exceptions
// try {
//     //Server settings
//     $mail->SMTPDebug = 2;                                 // Enable verbose debug output
//     $mail->isSMTP();                                      // Set mailer to use SMTP
//     $mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
//     $mail->SMTPAuth = true;                               // Enable SMTP authentication
//     $mail->Username = 'user@example.com';                 // SMTP username
//     $mail->Password = 'secret';                           // SMTP password
//     $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
//     $mail->Port = 587;                                    // TCP port to connect to

//     //Recipients
//     $mail->setFrom('from@example.com', 'Mailer');
//     $mail->addAddress('joe@example.net', 'Joe User');     // Add a recipient
//     $mail->addAddress('ellen@example.com');               // Name is optional
//     $mail->addReplyTo('info@example.com', 'Information');
//     $mail->addCC('cc@example.com');
//     $mail->addBCC('bcc@example.com');

//     //Attachments

//     //Content
//     $mail->isHTML(true);                                  // Set email format to HTML
//     $mail->Subject = 'Here is the subject';
//     $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
//     $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

//     $mail->send();
//     echo 'Message has been sent';
// } catch (Exception $e) {
//     echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
// }
?>