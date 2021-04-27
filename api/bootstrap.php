<?php
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
date_default_timezone_set('America/Lima');
require_once "vendor/autoload.php";
$isDevMode = true;
$config = Setup::createYAMLMetadataConfiguration(array(__DIR__ . "/config/yaml"), $isDevMode);
$conn = array(
'host' => 'ec2-54-78-36-245.eu-west-1.compute.amazonaws.com',
'driver' => 'pdo_pgsql',
'user' => 'rdgnokxaxidzro',
'password' => '2892d1bfa3910f5fe450efa506f52c56ced901db697147b41e11ea0aff070988',
'dbname' => 'd1vo464p50gu44',
'port' => '5432'
);
$entityManager = EntityManager::create($conn, $config);

// $clientRepository = $entityManager->getRepository('Catalogue');
// $clients = $clientRepository->findAll();
// print_r($clients);