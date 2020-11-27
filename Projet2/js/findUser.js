
window.addEventListener('load',initUsers);
//window.addEventListener('load',action);


function initUsers(){
    document.querySelector('#filter').addEventListener("keyup",sendUsers);
}

function sendUsers(){ // form event listener
  //ev.preventDefault();
  filtre = document.getElementById("filter");
  console.log(filtre.value);

  //let url = 'services/findUsers.php?'+formDataToQueryString(new FormData(this));
  let url = 'services/findUsers.php?search='+filtre.value;
  // let url = 'services/findUsers.php';
  // fetchFromJson(url, {method: "post",body:new FormData(this),credentials:'same-origin'})
  fetchFromJson(url)
  .then(processAnswer)
  .then(recherche, displayErrorMessageFollower);
}

function etatFindUser(){
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
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.messageFindUser'))
      elt.hidden=false;
}

function recherche(message) {
  console.log(message);
  let cible = document.querySelector('section#detail>div.messageFindUser');
  cible.textContent ='';
  cible.textContent ='';
  for (let i=0; i<message.length; i++){
    //console.log(message[i]);
    let header = document.createElement('h3');
    let image = document.createElement('img');
    image.className = 'mon_avatar';
    cible.appendChild(image);
    updateAvatar1(message[i].login);
    let span = document.createElement('span');
    cible.appendChild(span);
    header.textContent = message[i].login;
    header.className = message[i].login;
    //cible.appendChild(header);
    span.appendChild(header);
    let h5 = document.createElement('h5');
    h5.textContent = "@"+ message[i].pseudo;
    h5.style.color = "green";
    cible.appendChild(h5);
    etatFindUser();

  }
  for (let elt of document.querySelectorAll('.messageFindUser>span')){
      console.log(elt.children.length);
      console.log(elt.children);
       let id_button = elt.children;
       console.log(id_button);
       id_button[0].addEventListener("click",selection_author);
      }



}

function updateAvatar1(login) {
    let changeAvatar = function(blob) {
      if (blob.type.startsWith('image/')){ // le mimetype est celui d'une image
        let img = document.querySelectorAll('section#detail>div.messageFindUser>img.mon_avatar');
        for (i=0; i<img.length; i++)
          img[i].src = URL.createObjectURL(blob);
      }
    };
  fetchBlob('services/getAvatar.php?login='+login+'&size=small')
    .then(changeAvatar);
}

function displayErrorMessageFollower(error){
  let p = document.createElement('p');
  p.innerHTML = error.message;
  let cible  = document.querySelector('section#detail>div.messageFindUser');
  cible.textContent=''; // effacement
  cible.appendChild(p);
}
/*
function action(){
  document.getElementById("filter").addEventListener("keyup",recherche);
}*/
