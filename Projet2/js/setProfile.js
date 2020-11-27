
window.addEventListener('load',initSetProfile);

function initSetProfile(){
  document.forms.form_set.addEventListener('submit',sendSetProfile);
}
function sendSetProfile(ev){ // form event listener
  ev.preventDefault();
  let url = 'services/setProfile.php';
  fetchFromJson(url, {method: "post",body:new FormData(this),credentials:'same-origin'})
  .then(processAnswer)
  .then(displayPostMessage, displayErrorMessage);
}

function etatSetProfile(){
  for (let elt of document.querySelectorAll('.message'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.compte_message'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.button_plus'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.message_Follower'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.subscriptions'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.followers'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.profile'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.message_author'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.modification'))
      elt.hidden=false;
  for (let elt of document.querySelectorAll('.messageFindUser'))
      elt.hidden=true;
}
