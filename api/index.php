<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

use Tuupola\Middleware\HttpBasicAuthentication;
use \Firebase\JWT\JWT;


//use Catalogue;


require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/model/Catalogue.php';
require __DIR__ . '/vendor/autoload.php';
 
$app = AppFactory::create();

const JWT_SECRET = "makey1234567";

function addCorsHeaders (Response $response) : Response {

    $response =  $response
    ->withHeader("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, DELETE,OPTIONS')
    ->withHeader ("Access-Control-Expose-Headers" , "Authorization");
    return $response;
}


// Middleware de validation du Jwt
$options = [
    "attribute" => "token",
    "header" => "Authorization",
    "secure" => false,
    "algorithm" => ["HS256"],
    "secret" => JWT_SECRET,
    "path" => ["/api"],
    "ignore" => ["/hello","/api/hello","/api/login","/api/createUser", "/api/catalogue"],
    "error" => function ($response, $arguments) {
        $data = array('ERREUR' => 'Connexion', 'ERREUR' => 'JWT Non valide');
        $response = $response->withStatus(401);
        $response = @addCorsHeaders($response);
        return $response->withHeader("Content-Type", "application/json")->getBody()->write(json_encode($data));
    }
];



$app->get('/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = $args ['name'];
    $response->getBody()->write(json_encode ($array));
    $response = @addCorsHeaders($response);
    return $response;
});


$app->get('/catalogue', function (Request $request, Response $response, $args) {
      
    global $entityManager;
    $clientRepository = $entityManager->getRepository(Catalogue::class);
    $clients = $clientRepository->findAll();
    $response = @addCorsHeaders($response);
    return $clients;
});

$app->get('/api/catalogue', function (Request $request, Response $response, $args) {

    global $entityManager;
    $catalogueRepository = $entityManager->getRepository(Catalogue::class);
    $catalogue = $catalogueRepository->findAll();
    $data = [];

    foreach ($catalogue as $e) {
        $elem = [];
        $elem ["ref"] = $e->getRef();
        $elem ["titre"] = $e->getTitre ();
        $elem ["prix"] = $e->getPrix ();
        array_push ($data,$elem);
    }

    $response = $response
    ->withHeader("Content-Type", "application/json;charset=utf-8");

    
    $response->getBody()->write(json_encode($data));
    $response = @addCorsHeaders($response);
    return $response;
});




$app->get('/api/hello/{name}', function (Request $request, Response $response, $args) {
    $array = [];
    $array ["nom"] = $args ['name'];
    $response->getBody()->write(json_encode ($array));
    $response = @addCorsHeaders($response);
    return $response;
});


$app->post('/api/login', function (Request $request, Response $response, $args) {    
    $issuedAt = time();
    $expirationTime = $issuedAt + 60000;
    $payload = array(
        'userid' => "12345",
        'email' => "emmanuel.maurice@gmail.com",
        'pseudo' => "emma",
        'iat' => $issuedAt,
        'exp' => $expirationTime
    );

    $token_jwt = JWT::encode($payload,JWT_SECRET, "HS256");
    $response = $response->withHeader("Authorization", "Bearer {$token_jwt}");
    $response = @addCorsHeaders($response);
    return $response;
});



// Chargement du Middleware
$app->add(new Tuupola\Middleware\JwtAuthentication($options));
$app->run ();