<?php
require_once __DIR__ . '/../vendor/autoload.php';

$log = new Monolog\Logger('google-test');
$log->pushHandler(new Monolog\Handler\StreamHandler(__DIR__ . '/../app.log', Monolog\Logger::INFO));
$log->info('Verifying Google Signin');

// Get $token via HTTPS POST.
$id_token = $_POST['token'];
// echo($id_token);

$log->info($_POST['token']);

$client = new Google_Client(['client_id' => '35845680733-mj1o02ahgc89e94hid0935g4mp0a7nce.apps.googleusercontent.com']);  // Specify the CLIENT_ID of the app that accesses the backend
$payload = $client->verifyIdToken($id_token);
// echo $client->tokenInfo($id_token);
$userid = '';
$email = '';
if ($payload) {
  $userid = $payload['sub'];
  $email = $payload['email'];
  $image = $payload['picture'];
  $firstname = $payload['given_name'];
  $secondname = $payload['family_name'];
  $log->info("valid token with user of ".$userid);
  // If request specified a G Suite domain:
  //$domain = $payload['hd'];
} else {
  // Invalid ID token
  $log->info("invalid token ".$id_token);
}

$results = array('userid' => $userid ,
                  'email' => $email,
                  'picture' =>$image,
                  'given_name' => $firstname,
                  'family_name'=> $secondname);

// Allow any client to access
header("Access-Control-Allow-Origin: *");
// Let the client know the format of the data being returned
header("Content-Type: application/json");

// Sending back down as JSON
echo json_encode($results);

?>