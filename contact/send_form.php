<?php
if($_POST['honeypot'] != ''){
   die("You spammer!");
}
if(!isset($_POST['submit']))
{
  //This page should not be accessed directly. Need to submit the form.
  echo "error; you need to submit the form!";
}

$name = $_POST['name'];
$visitor_email = $_POST['email'];
$ip = $_SERVER['REMOTE_ADDR'];

//Validate first
if(empty($name)||empty($visitor_email)) 
{
    echo "Oops! We really need you to fill out your name and email.";
    exit;
}

if (!filter_var($visitor_email, FILTER_VALIDATE_EMAIL))
{
    echo "Oops! Please enter a valid email.";
    exit;
}

if(IsInjected($visitor_email))
{
    echo "Oops! Please enter a valid email.";
    exit;
}

$email_from = 'Todd Seller';
$email_subject = "All About Me!";
$email_body = "$name wants more information. You better reach out to them!\n".
              "Name: ".$name."\n"
             ."Email: ".$visitor_email."\n"
             ."Contacted you from ip address: ".$ip."\n";
    
$to = "me@toddseller.com";
$headers = "From: $email_from \r\n";
$headers .= "Reply-To: $visitor_email \r\n";
//Send the email!
mail($to,$email_subject,$email_body,$headers);
//done. redirect to thank-you page.
header('Location: http://toddseller.github.io/contact/thank-you.html');


// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
   
?> 