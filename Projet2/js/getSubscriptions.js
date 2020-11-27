select_choix =null;

window.addEventListener('load',initSubscriptions);

function initSubscriptions(){
  //sendSubscriptions();
  for (let elt of document.querySelectorAll('.subscriptions')){
    console.log(elt.children.length);
    for (let i=0; i<elt.children.length; i++){
      let id_button = elt.children[i];
      console.log(id_button);
      id_button.addEventListener("click",select);
    }
  }
}



function sendSubscriptions(){ // form event listener
  //ev.preventDefault();
  let url = 'services/getSubscriptions.php';
  fetchFromJson(url)
  .then(processAnswer)
  .then(displaySubscriptions, displayErrorMessage);
}



function displaySubscriptions(message){

  let cible = document.querySelector('section#detail>div.subscriptions');
  cible.textContent ='';
  for (let i=0; i<message.length; i++){
    //console.log(message[i]);
    let header = document.createElement('h3');
    let image = document.createElement('img');
    image.className = 'mon_avatar';
    cible.appendChild(image);
    updateAvatar1(message[i].userId);
    header.textContent = message[i].userId;
    header.className = 'desa'
    cible.appendChild(header);
    desabonne = document.createElement("button");
    desabonne.className= 'desa';
    desabonne.id = message[i].userId;
    desabonne.textContent = "unfollow";
    cible.appendChild(desabonne);
    let h5 = document.createElement('h5');
    h5.textContent = "@"+ message[i].pseudo;
    h5.style.color = "green";
    cible.appendChild(h5);
    initSubscriptions();



    // p.innerHTML =
    //   `<span>${message[i].author}</span>
    //    <span> ${message[i].pseudo}</span>
    //    <span> ${message[i].datetime}</span>
    //    <span> ${message[i].content}</span>
    //      `;


      //cible.appendChild(p);
     }
}

function updateAvatar1(login) {
    let changeAvatar = function(blob) {
      if (blob.type.startsWith('image/')){ // le mimetype est celui d'une image
        let img = document.querySelectorAll('section#detail>div.subscriptions>img.mon_avatar');
        for (i=0; i<img.length; i++)
          img[i].src = URL.createObjectURL(blob);
      }
    };
  fetchBlob('services/getAvatar.php?login='+login+'&size=small')
    .then(changeAvatar);
}

function etatSubscriptions(){
  for (let elt of document.querySelectorAll('.message'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.compte_message'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.button_plus'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.message_Follower'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.subscriptions'))
      elt.hidden=false;
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
  sendSubscriptions();
}

function sendunfollow(){ // form event listener
  //ev.preventDefault();
  if (select_choix!=null){
    let url = 'services/unfollow.php?target='+select_choix.id;
    fetchFromJson(url)
    .then(processAnswer)
    .then(displayUnfollow, displayErrorMessage);
  }
}
function displayUnfollow(){
  etatSubscriptions()
}

function displayErrorMessage(error){
  let p = document.createElement('p');
  p.innerHTML = error.message;
  let cible  = document.querySelector('section#detail>div.subscriptions');
  cible.textContent=''; // effacement
  cible.appendChild(p);
}

function select(){
  select_choix = this;
  this.id = this.id;
  console.log(select_choix.id);
  if (select_choix !=null){
    sendunfollow();

  }
}
