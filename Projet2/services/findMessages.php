<?php
set_include_path('..'.PATH_SEPARATOR);

require_once('lib/common_service.php');



  $args = new RequestParameters();
  $args->defineNonEmptyString('author');
  $args->defineNonEmptyString('count');
  $args->defineNonEmptyString('before');

  if (! $args->isValid()){
   produceError('argument(s) invalide(s) --> '.implode(', ',$args->getErrorMessages()));
   return;
  }
  try{
    $data =  new DataLayer();
    $message = $data->findMessages($args->author, $args->before, $args->count);
    if ($message)
      produceResult($message);
  else
    produceError("Id du message n'existe pas !!!");
  }catch (PDOException $e){
    produceError($e->getMessage());
  }
?>
