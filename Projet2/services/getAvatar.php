<?php
set_include_path('..'.PATH_SEPARATOR);
require_once('lib/common_service.php');


$args = new RequestParameters();
$args->defineNonEmptyString('login');
$args->defineNonEmptyString('size');

if (! $args->isValid()){
  produceError('argument(s) invalide(s) --> '.implode(', ',$args->getErrorMessages()));
  return;
}

try{
  $data = new DataLayer();
  $descFile = $data->getAvatar($args->login, $args->size);
  if ($descFile){ // l'utilisateur existe
    // si l'avatar est NULL, renvoyer l'avatar par défaut :
    $flux = is_null($descFile['data']) ? fopen('../images/avatar_def.png','r') : $descFile['data'];
    $avatar_type = is_null($descFile['data']) ? 'image/png' : $descFile['avatar-type'];

    header("Content-type: $avatar_type");
    fpassthru($flux);
    exit();
  }
  else
    produceError('Utilisateur inexistant');
}
catch (PDOException $e){
  produceError($e->getMessage());
}

?>
