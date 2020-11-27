window.addEventListener('load',initFollowers);

function initFollowers(){
  //sendFollowers();
}

function sendFollowers(){ // form event listener
  //ev.preventDefault();
  let url = 'services/getFollowers.php';
  fetchFromJson(url)
  .then(processAnswer)
  .then(displayFollowers, displayErrorMessage);
}



function displayFollowers(message){
  let cible = document.querySelector('section#detail>div.followers');
  cible.textContent ='';
  for (let i=0; i<message.length; i++){
    //console.log(message[i]);
    let header = document.createElement('h3');
    let image = document.createElement('img');
    image.className = 'mon_avatar';
    cible.appendChild(image);
    updateAvatar1(message[i].userId);
    let span = document.createElement('span');
    header.textContent = message[i].userId;
    header.className = 'desa'+' '+message[i].userId;
    //cible.appendChild(header);
    span.appendChild(header)
    let mention = document.createElement("button");
    mention.id = message[i].userId;
    mention.className = 'desa';
    if (message[i].mutual == false){
      mention.textContent = "Follow";
    }
    else if (message[i].mutual == true){
      mention.textContent = "Unfollow"
    }
    let h5 = document.createElement('h5');
    h5.textContent = '@'+message[i].pseudo;
    cible.appendChild(h5);


    // p.innerHTML =
    //   `<span>${message[i].author}</span>
    //    <span> ${message[i].pseudo}</span>
    //    <span> ${message[i].datetime}</span>
    //    <span> ${message[i].content}</span>
    //      `;


      //cible.appendChild(p);
     }

     for (let elt of document.querySelectorAll('.followers>span')){
         console.log(elt.children.length);
         console.log(elt.children);
          let id_button = elt.children;
          console.log(id_button);
          id_button[0].addEventListener("click",selection_author);
         }
}
function etatFollowers(){
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
      elt.hidden=false;
  for (let elt of document.querySelectorAll('.profile'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.message_author'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.modification'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.messageFindUser'))
      elt.hidden=true;
  sendFollowers()
}
function updateAvatar1(login) {
    let changeAvatar = function(blob) {
      if (blob.type.startsWith('image/')){ // le mimetype est celui d'une image
        let img = document.querySelectorAll('section#detail>div.followers>img.mon_avatar');
        for (i=0; i<img.length; i++)
          img[i].src = URL.createObjectURL(blob);
      }
    };
  fetchBlob('services/getAvatar.php?login='+login+'&size=small')
    .then(changeAvatar);
}

function displayErrorMessage(error){
  let p = document.createElement('p');
  p.innerHTML = error.message;
  let cible  = document.querySelector('section#detail>div.followers');
  cible.textContent=''; // effacement
  cible.appendChild(p);
}
