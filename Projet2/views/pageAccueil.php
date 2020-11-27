
<?php

//require_once(__DIR__.'/lib/fonctionsHTML.php');
  $dataPersonne ="";    // si utilisateur non authentifié, data-personne n'est pas défini

  if (isset($personne)) // l'utilisateur est authentifié
     $dataPersonne = 'data-personne="'.htmlentities(json_encode($personne)).'"'; // l'attribut data-personne contiendra l'objet personne, en JSON

?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="fr" lang="fr">
<head>
 <meta charset="UTF-8" />
 <title>Rézozio</title>
 <link rel="stylesheet" href="style/css_1.css" />
 <link rel="stylesheet" href="style/css_2.css" />
 <link rel="stylesheet" href="style/css_3.css" />
 <script src="js/gestion_log.js"></script>
 <script src="js/fetchUtils.js"></script>
 <script src="js/Message.js"></script>
 <script src="js/postMessage.js"></script>
 <script src="js/message_followed.js"></script>
 <script src="js/getSubscriptions.js"></script>
 <script src="js/getFollowers.js"></script>
 <script src="js/setProfile.js"></script>
 <script src="js/findUser.js"></script>
</head>
<?php
  echo "<body $dataPersonne>";
?>
  <h1>Rézozio</h1>
  <section id ="recherche">
    <input type="text" placeholder="rechercher" id="filter"/>
  </section>
  <section id="explorer">
  <div class="resultat">
    <button id="1-explo">Fil d'actualité</button>
    <button id="2-explo">Message</button>
    <button id="3-explo">Abonnés</button>
    <button id="4-explo">Abonnements</button>
    <button id="5-explo">Profil</button>
    <button id="6-explo">Modifier Profil</button>

  </div>
  </section>
  <section id="detail">
    <div class="profile">
    </div>
    <div class="message"></div>
    <div class="messageFindUser"></div>
    <div class="message_author"></div>
    <div class="message_Follower"></div>
    <div class="followers"></div>
    <div class="subscriptions"></div>
    <section class="modification">
      <form method="POST" action="services/setProfile.php"  id="form_set">
        <fieldset>
          <legend>Modification</legend>
          <label for="pseudo">Pseudo :</label>
          <input type="text" name="pseudo" id="pseudo_modi" maxlength="25"/></br>
          <label for="password">Mot de passe :</label>
          <input type="password" name="password" id="password_modi"  maxlength="12" /></br>
          <fieldset>
            <legend>Description</legend>
            <textarea id ="mon_message" name="description" cols ="60" rows="12" maxlength="1024"></textarea>
          </fieldset>
          <button type="reset">Effacer</button>
          <button type="submit" name="valid">OK</button></br>
          <output  for="login password" name="message"></output>
        </fieldset>
      </form>
    </section>
    <div class="compte_message">
      <form method="POST" action="services/postMessage.php" id ="form_post">
        <fieldset>
          <legend>Message</legend>
          <textarea id ="mon_message" name="source" cols ="60" rows="12" maxlength="1024"></textarea>
        </fieldset>
        <button type="reset">Effacer</button>
        <button type="submit" name="valid" value="envoyer">Partager</button>
      </form>
    </div>
    <div class="button_plus">
    <button id = "plus">Voir plus</button></div>
  </section>
  <section id="espace_variable">
    <section class="deconnecte">
      <form method="POST" action="services/login.php"  id="form_login">
        <fieldset>
          <legend>Connexion</legend>
          <label for="login">Login :</label>
          <input type="text" name="login" id="login" maxlength="25" required="" autofocus=""/></br>
          <label for="password">Mot de passe :</label>
          <input type="password" name="password" id="password" required="required" maxlength="12" /></br>
          <button type="submit" name="valid">OK</button></br>
          <output  for="login password" name="message"></output>
        </fieldset>
      </form>
      <button id= "create">INSCRIPTION</button></br>
    </section>


    <section class="connecte">
      <img id="avatar" alt="mon avatar" src="" />
      <h2 id="titre_connecte"></h2>
      <fieldset>
        <legend>Description</legend>
        <p></p>
      </fieldset>
      <button id="logout">Déconnexion</button>
    </section>
    <section class='inscription'>
      <form method="POST" action="services/createUser.php" id="form_inscription">
        <fieldset>
          <legend>INSCRIPTION</legend>
          <label for="login">UserId :</label>
          <input type="text" name="login" id="userId" required="" autofocus="" maxlength="25"/></br>
          <label for="password">Mot de passe :</label>
          <input type="password" name="password" id="password" required="required" maxlength="25"/></br>
          <label for="pseudo">Pseudo :</label>
          <input type="text" name="pseudo" id="pseudo" required="required" maxlength="25"/></br>
          <button type="submit" name="valid">Valider</button></br>
        </fieldset>
      </form>
      <button id= "connexion">CONNEXION</button></br>
    </section>
    <section class='terminer'>
      <h3></h3>
      <p></p>
      <button id='retour'></button>
    </section>
  </section>


  </body>
</html>
