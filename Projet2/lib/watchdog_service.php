<?php
 require_once('lib/common_service.php');
 require_once('lib/session_start.php');
 
 if (isset($_SESSION['ident']))
  return;

 produceError('non authentifié ');
 exit();
?>
