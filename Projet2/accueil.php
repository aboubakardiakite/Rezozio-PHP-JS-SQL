<?php
spl_autoload_register(function ($className) {
    include ("lib/{$className}.class.php");
});
session_name('s8_ibrahima');
session_start();
if (isset($_SESSION['ident'])){
    $personne = $_SESSION['ident'];
}

date_default_timezone_set ('Europe/Paris');
try{
    $data = new DataLayer();
    require ('views/pageAccueil.php');
} catch (PDOException $e){
    $errorMessage = $e->getMessage();
    require("views/pageErreur.php");
}

?>
