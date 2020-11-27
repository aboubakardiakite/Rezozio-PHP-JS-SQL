<?php
class Users {
  public $login;
  public $pseudo;
  public function __construct($login,$pseudo)
  {
    $this->login = $login;
    $this->pseudo = $pseudo;
  }
}
?>
