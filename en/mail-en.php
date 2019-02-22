<?php

	header('Content-Type: text/html; charset=utf-8');

	$name = $_POST['name'];
	$email = $_POST['email'];
	$phone = $_POST['phone'];
	$message = $_POST['message'];

	function clean($value = ""){
		$value = trim($value);
		$value = stripslashes($value);
		$value = strip_tags($value);
		$value = htmlspecialchars($value);
		$value = substr($value, 0, 1000);
		return $value;
	}

	function check_length($value = "", $min){
		$result = (mb_strlen($value) < $min);
		return !$result;
	}

	$name = clean($name);
	$email = clean($email);
	$phone = clean($phone);
	$message = clean($message);

	if(!empty($name) AND !empty($email) AND !empty($message)){

		$email_validate = filter_var($email, FILTER_VALIDATE_EMAIL);
		if($email_validate){

			$from = $email;
			$to = 'natalia.nikolova@seznam.cz';

			$headers = 'From: '.$from.'\r\nTo: '.$to.'\r\nMIME-Version: 1.0\r\nContent-type: text/plain; charset=utf-8\r\n';
			$subject = 'Communication from '.$name.' <'.$email.'> '.$phone;

			if (mail($to, $subject, $_POST['message'], $headers)) {
				echo "Message sent";
			} else {
				echo "Sorry, could not send";
			}


		} else {
			echo "Verify the email address is valid";
		}

	} else {
		echo "Fill in all the fields";
	}

?>