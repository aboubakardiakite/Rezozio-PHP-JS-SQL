<?php
set_include_path('..'.PATH_SEPARATOR);
require_once('lib/watchdog_service.php');
//require_once('lib/common_service.php');

    try{
      $data =  new DataLayer();
      $info = $data->getSubsscriptions();
      if ($info)
        produceResult($info);
      else if ($info == array()){
        produceResult($info);
      }
      else
        produceError("Id du message n'existe pas !!!");
    }catch (PDOException $e){
      produceError($e->getMessage());
    }


?>
