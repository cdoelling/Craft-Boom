<?php
if($_POST['bbsubmit'])
{
	$name = $_POST['bbname'];
	$email = $_POST['bbemail'];
	$message = $_POST['bbmessage'];
	if($name == '' || $email == '' || $message == '')
		return 0;

	//recipient
	$to = 'Your Name <your@mail.com>';	 // <--------- CHANGE YOUR E-MAIL HERE!!!!!!!!!!!!!!!!!!!!!!!
	//sender
	$from = $name . ' <' . $email . '>';
	
	//subject and the html message
	$subject = 'Message from ' . $name;	
	$message = '
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" 
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html xmlns="http://www.w3.org/1999/xhtml">
	<head></head>
	<body>
	<table>
		<tr><td>Name</td><td>' . $name . '</td></tr>
		<tr><td>Email</td><td>' . $email . '</td></tr>
		<tr><td>Message</td><td>' . nl2br($message) . '</td></tr>
	</table>
	</body>
	</html>';

	//send the mail
	$result = sendmail($to, $subject, $message, $from);
	if($result == 1)
		echo 'sent';
}
//Simple mail function with HTML header
function sendmail($to, $subject, $message, $from) {
	$headers = "MIME-Version: 1.0" . "\r\n";
	$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
	$headers .= 'From: ' . $from . "\r\n";
	
	$result = mail($to,$subject,$message,$headers);
	
	if ($result) return 1;
	else return 0;
}
?>