let selection_choix =null;
window.addEventListener('load',initPostMessage);

function initPostMessage(){
  for (let elt of document.querySelectorAll('.resultat')){
    console.log(elt.children.length);
    for (let i=0; i<elt.children.length; i++){
      let id_button = elt.children[i];
      console.log(id_button);
      id_button.addEventListener("click",selection);
    }
  }
   // if (selection_choix !=null){
   //   if (selection_choix.id == '2-explo')
   //    document.querySelector('#2-explo').addEventListener('click',etatMessage);
   // }
   document.forms.form_post.addEventListener('submit',sendPostMessage);


}
function filActualité(){
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
}

function processAnswer(answer){
  if (answer.status == "ok")
    return answer.result;
  throw new Error(answer.message);
}
function sendPostMessage(ev){ // form event listener
  ev.preventDefault();
  let url = 'services/postMessage.php';
  fetchFromJson(url, {method: "post",body:new FormData(this),credentials:'same-origin'})
  .then(processAnswer)
  .then(displayPostMessage, displayErrorMessage);
}
function etatMessage(){
  for (let elt of document.querySelectorAll('.message'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.compte_message'))
      elt.hidden=false;
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
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.messageFindUser'))
      elt.hidden=true;

}

function displayPostMessage(){

  for (let elt of document.querySelectorAll('.compte_message'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.button_plus'))
      elt.hidden=false;
  for (let elt of document.querySelectorAll('.message_Follower'))
      elt.hidden=false;
  for (let elt of document.querySelectorAll('.subscriptions'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.followers'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.profile'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.message_author'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.modification'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.messageFindUser'))
      elt.hidden=true;


}

function displayErrorMessage(error){
  let p = document.createElement('p');
  p.innerHTML = error.message;
  let cible  = document.querySelector('section#detail>div.compte_message');
  cible.textContent=''; // effacement
  cible.appendChild(p);
}
function selection(){
  selection_choix = this;
  this.id = this.id;
  //console.log(selection_choix.id);
  let a ="ibrahima";
  if (selection_choix.id =='1-explo'){
    filActualité();
  }
  else if ((selection_choix.id =='2-explo')){
    console.log(a);
    //sendPostMessage();
    etatMessage()
  }
  else if (selection_choix.id =='3-explo'){
     etatSubscriptions();
     console.log("bah");
    //etatSubscriptions();
   }
  else if (selection_choix.id =='4-explo'){
    etatFollowers();
  }
  else if (selection_choix.id =='6-explo'){
    etatSetProfile();
    console.log("elhadj");
  }

}
