<?php
// Подключение библиотеки
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Получение данных
$json = file_get_contents('php://input'); // Получение json строки
$data = json_decode($json, true); // Преобразование json

$name = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$message = $data['message'];

$title = 'Заявка с сайта LightFrame'; // Название письма
$body = '<p>Имя: <strong>'.$name.'</strong></p>';
$body .= '<p>E-mail: <strong>'.$email.'</strong></p>';
$body .= '<p>Телефон: <strong>'.$phone.'</strong></p>';
$body .= '<p>Сообщение: <strong>'.$message.'</strong></p>';

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
  $mail->isSMTP();
  $mail->CharSet = 'UTF-8';
  $mail->SMTPAuth   = true;

  // Настройки почты отправителя
  $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
  $mail->Username   = 'tonymind58@gmail.com'; // Логин на почте
  $mail->Password   = 'siva xets txyk hhll'; // Пароль на почте
  $mail->SMTPSecure = 'ssl';
  $mail->Port       = 465;

  $mail->setFrom('tonymind58@gmail.com'); // Адрес самой почты и имя отправителя

  // Получатель письма
  $mail->addAddress('sushkasachka@gmail.com');

  // Отправка сообщения
  $mail->isHTML(true);
  $mail->Subject = $title;
  $mail->Body = $body;

  $mail->send('d');

  // Сообщение об успешной отправке
  echo ('Сообщение успешно отправлено.');

} catch (Exception $e) {
  header('HTTP/1.1 400 Bad Request');
  echo('Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}');
}
