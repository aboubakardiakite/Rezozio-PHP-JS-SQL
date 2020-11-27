
window.addEventListener('load',initState);
window.addEventListener('load',initLog);

var currentUser = null; //objet "personne" de l'utilisateiur connecté
function initState(){ // initialise l'état de la page
  let personne = document.body.dataset.personne;
  if(personne == null)
    etatDeconnecte();
  else{
    personne = JSON.parse(personne);
    if (personne.login == null || personne.pseudo == null)
      etatDeconnecte();
    else
      etatConnecte(personne);
  }
  // sera à modifier en question 3
}

function etatDeconnecte() { // passe dans l'état 'déconnecté'
    // cache ou montre les éléments
    for (let elt of document.querySelectorAll('.connecte'))
       elt.hidden=true;
    for (let elt of document.querySelectorAll('.deconnecte'))
       elt.hidden=false;
    for (let elt of document.querySelectorAll('.message'))
        elt.hidden=false;
    for (let elt of document.querySelectorAll('.resultat'))
        elt.hidden=true;
    for (let elt of document.querySelectorAll('.compte_message'))
        elt.hidden=true;
    for (let elt of document.querySelectorAll('.inscription'))
        elt.hidden = true;
    for (let elt of document.querySelectorAll('.terminer'))
        elt.hidden = true;
    for (let elt of document.querySelectorAll('.message_Follower'))
        elt.hidden=true;
    for (let elt of document.querySelectorAll('.modification'))
        elt.hidden=true;
    for (let elt of document.querySelectorAll('.messageFindUser'))
        elt.hidden=true;

    // nettoie la partie personnalisée :
    currentUser = null;
    delete(document.body.dataset.personne);
    document.querySelector('#titre_connecte').textContent='';
    document.querySelector('#avatar').src='';

}

function etatConnecte(personne) { // passe dans l'état 'connecté'
    currentUser = personne;
    // cache ou montre les éléments
    for (let elt of document.querySelectorAll('.deconnecte'))
       elt.hidden=true;
    for (let elt of document.querySelectorAll('.connecte'))
       elt.hidden=false;
    for (let elt of document.querySelectorAll('.message'))
       elt.hidden=true;
    for (let elt of document.querySelectorAll('.resultat'))
        elt.hidden=false;
     for (let elt of document.querySelectorAll('.compte_message'))
             elt.hidden=true;
    for (let elt of document.querySelectorAll('.inscription'))
        elt.hidden = true;
    for (let elt of document.querySelectorAll('.terminer'))
        elt.hidden = true;
    for (let elt of document.querySelectorAll('.message_Follower'))
        elt.hidden=false;
    for (let elt of document.querySelectorAll('.modification'))
          elt.hidden=true;
    for (let elt of document.querySelectorAll('.messageFindUser'))
        elt.hidden=true;

      sendMessageFollower();

    // personnalise le contenu
    document.querySelector('#titre_connecte').innerHTML = `${currentUser.pseudo}`;

    updateAvatar();

}
function valide(personne){
  currentUser = personne;
  let cible = document.querySelector('section#espace_variable>section.terminer');
  let header = document.querySelector('section#espace_variable>section.terminer>h3');
  header.textContent = "hello " + currentUser.login + " !!!!";
  p = document.querySelector('section#espace_variable>section.terminer>p');
  p.textContent = "Le compte " +currentUser.pseudo + " est crée avec succès cliquer pour vous connecté";
  button = document.querySelector('section#espace_variable>section.terminer>button');
  button.textContent = "Connecter"
  cible.appendChild(button);
  for (let elt of document.querySelectorAll('.deconnecte'))
     elt.hidden=true;
  for (let elt of document.querySelectorAll('.connecte'))
     elt.hidden=true;
  for (let elt of document.querySelectorAll('.message'))
     elt.hidden=true;
  for (let elt of document.querySelectorAll('.resultat'))
      elt.hidden=false;
  for (let elt of document.querySelectorAll('.compte_message'))
          elt.hidden=true;
  for (let elt of document.querySelectorAll('.inscription'))
      elt.hidden = true;
  for (let elt of document.querySelectorAll('.terminer'))
      elt.hidden = false;
  for (let elt of document.querySelectorAll('.message_Follower'))
          elt.hidden=true;
  for (let elt of document.querySelectorAll('.modification'))
          elt.hidden=true;
}

function etatInscription(){

  for (let elt of document.querySelectorAll('.deconnecte'))
     elt.hidden=true;
  for (let elt of document.querySelectorAll('.connecte'))
     elt.hidden=true;
  for (let elt of document.querySelectorAll('.message'))
     elt.hidden=false;
  for (let elt of document.querySelectorAll('.compte_message'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.resultat'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.inscription'))
      elt.hidden = false;
  for (let elt of document.querySelectorAll('.valide'))
      elt.hidden = true;
  for (let elt of document.querySelectorAll('.message_Follower'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.modification'))
      elt.hidden=true;


}

function initLog(){ // mise en place des gestionnaires sur le formulaire de login et le bouton logout
  document.forms.form_login.addEventListener('submit',sendLogin); // envoi
  document.forms.form_login.addEventListener('input',function(){this.message.value='';}); // effacement auto du message
  document.querySelector('#logout').addEventListener('click',sendLogout);
  document.querySelector('#create').addEventListener('click',etatInscription);
  document.forms.form_inscription.addEventListener('submit',sendInscription); // envoi
  document.querySelector('#retour').addEventListener('click',etatDeconnecte);
  document.querySelector('#connexion').addEventListener('click',etatDeconnecte);
}

function updateAvatar() {
    let changeAvatar = function(blob) {
      if (blob.type.startsWith('image/')){ // le mimetype est celui d'une image
        let img = document.getElementById('avatar');
        img.src = URL.createObjectURL(blob);
      }
    };
  fetchBlob('services/getAvatar.php?login='+currentUser.login+'&size=small')
    .then(changeAvatar);
}
function processAnswer(answer){
  if (answer.status == "ok")
    return answer.result;
  throw new Error(answer.message);
}

function sendLogin(ev){ // gestionnaire de l'évènement submit sur le formulaire de login
  ev.preventDefault();
  let url="services/login.php";
  fetchFromJson(url, {method: "post",body:new FormData(this),credentials:'same-origin'})
  .then(processAnswer)
  .then(etatConnecte,errorLogin);
}

function sendLogout(ev){ // gestionnaire de l'évènement click sur le bouton logout
  ev.preventDefault();
  let url = "services/logout.php";
  fetchFromJson(url)
  .then(processAnswer)
  .then(etatDeconnecte);
}

function sendInscription(ev){
  ev.preventDefault();
  let url ="services/createUser.php";
  fetchFromJson(url, {method: "post",body:new FormData(this),credentials:'same-origin'})
  .then(processAnswer)
  .then(valide,errorLogin);
}

function errorLogin(error) {
   // affiche error.message dans l'élément OUTPUT.
  document.forms.form_login.message.value = 'échec : ' + error.message;
}

// function personaliser(){
//   let cible = document.querySelector('section#explorer>div.resultat');
//   var button = document.createElement('button');
//   button.id = '1-explo';
//   button.textContent = "Messages";
//   cible.appendChild(button);
//   var button = document.createElement('button');
//   button.id = '2-explo';
//   button.textContent = "Abonnés";
//   cible.appendChild(button);
//   var button = document.createElement('button');
//   button.id = '3-explo';
//   button.textContent = "Abonnements";
//   cible.appendChild(button);
//   var button = document.createElement('button');
//   button.id = '4-explo';
//   button.textContent = "Profil";
//   cible.appendChild(button);
//   var button = document.createElement('button');
//   button.id = '5-explo';
//   button.textContent = "Modifier Profil";
//   cible.appendChild(button);
//
// }
//------ matériel pour la question 4 :

/*
 * liste : liste de coureurs
 * résultat : noeud DOM d'une table représentant la liste
 */
function tableFavoris(liste){
  let table = document.createElement('table');
  let row = table.createTHead().insertRow();
  row.insertCell().textContent = 'dossard';
  row.insertCell().textContent = 'nom';
  row.insertCell().textContent = 'équipe';
  row.insertCell().textContent = 'taille';
  table.createTBody();
  for (let coureur of liste){
    addFavoriToTable(coureur,table);
  }
  return table;
}

/*
 * coureur : objet représentant un coureur
 * table : noeud DOM d'une table.
 *
 * action : ajoute une ligne rprésentant le coureur
 * résultat : aucun
 */
function addFavoriToTable(coureur, table) {
  let row = table.tBodies[0].insertRow();
  row.id = coureur.dossard + "-favori";
  row.insertCell().textContent = coureur.dossard;
  row.insertCell().textContent = coureur.nom;
  row.insertCell().textContent = coureur['équipe'];
  row.insertCell().textContent = coureur.taille;
  // hors sujet
  /*
  let b = document.createElement('button');
  b.textContent = 'Supp.';
  b.classList.add('suppFav');
  b.dataset.dossard = coureur.dossard;
  b.addEventListener('click',sendSuppFav);
  row.cells[0].appendChild(b);
  */
}
