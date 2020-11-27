<?php
set_include_path('..'.PATH_SEPARATOR);

require_once('lib/common_service.php');



  $args = new RequestParameters();
  $args->defineNonEmptyString('login');

  if (! $args->isValid()){
   produceError('argument(s) invalide(s) --> '.implode(', ',$args->getErrorMessages()));
   return;
  }
  try{
    $data =  new DataLayer();
    $user = $data->getUser($args->login);
    if ($user != NULL)
      produceResult($user);
  else
    produceError("le login est incorrecte !!!");
  }catch (PDOException $e){
    produceError($e->getMessage());
  }



?>
