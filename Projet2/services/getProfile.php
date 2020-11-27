<?php
set_include_path('..'.PATH_SEPARATOR);

require_once('lib/common_service.php');
require_once('lib/session_start.php');

$args = new RequestParameters();
$args->defineNonEmptyString('login');
if ( ! isset($_SESSION['ident'])) {


  if (! $args->isValid()){
   produceError('argument(s) invalide(s) --> '.implode(', ',$args->getErrorMessages()));
   return;
  }
    $data =  new DataLayer();
    $personne = $data->getProfile($args->login);
    if ($personne){
    produceResult($personne);
  }
  else{
    produceError("Paramètre incorrete !!!");
  }

} else{
    require_once('lib/watchdog_service.php');
    if (! $args->isValid()){
     produceError('argument(s) invalide(s) --> '.implode(', ',$args->getErrorMessages()));
     return;
    }
      $data =  new DataLayer();
      $personne = $data->getProfile2($args->login);
      if ($personne){
      produceResult($personne);
    }
    else{
      produceError("Paramètre incorrete !!!");
    }
}
?>
