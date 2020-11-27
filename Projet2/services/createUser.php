<?php
set_include_path('..'.PATH_SEPARATOR);

require_once('lib/common_service.php');

  $args = new RequestParameters();
  $args->defineNonEmptyString('login');
  $args->defineNonEmptyString('password');
  $args->defineNonEmptyString('pseudo');

  if (! $args->isValid()){
   produceError('argument(s) invalide(s) --> '.implode(', ',$args->getErrorMessages()));
   return;
  }
   try{
    $data =  new DataLayer();
    $personne = $data->createUser($args->login, $args->password, $args->pseudo);
    if ($personne)
      produceResult($personne);
    else
      produceError("Information manquante ou compte {$args->login} déjà existant !!!");
}catch (PDOException $e){
  produceError($e->getMessage());
}

?>
