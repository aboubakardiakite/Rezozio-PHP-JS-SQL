<?php
set_include_path('..'.PATH_SEPARATOR);
require_once('lib/watchdog_service.php');
//require_once('lib/common_service.php');


    $args = new RequestParameters();
    $args->defineNonEmptyString('source');


    if (! $args->isValid()){
     produceError('argument(s) invalide(s) --> '.implode(', ',$args->getErrorMessages()));
     return;
    }
    try{
      $data =  new DataLayer();
      $message = $data->postMessage($args->source);
      if ($message)
        produceResult($message);
    else
      produceError("Id du message n'existe pas !!!");
    }catch (PDOException $e){
      produceError($e->getMessage());
    }


?>
