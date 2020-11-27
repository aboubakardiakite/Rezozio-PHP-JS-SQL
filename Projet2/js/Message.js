let select_author = null;
//window.addEventListener('load',initMessage);
window.addEventListener('load',initMessage1);
window.addEventListener('load',profileAuthor);

function initMessage1(){
    sendMessage();
}
// function initMessage(){
//
//   for (let elt of document.querySelectorAll('.message')){
//     console.log(elt.children.length);
//     console.log(elt.children);
//
//     // for (let i=0; i<elt.children.length; i++){
//     //   let id_button = elt.children[i];
//     //   console.log(id_button);
//     //   id_button.addEventListener("click",select_author);
//     // }
//   }
// }
// function profileAuthor(profil){
//   profil.addEventListener('click',profileAuthor);
// }

function processAnswer(answer){
  if (answer.status == "ok")
    return answer.result;
  throw new Error(answer.message);
}

function sendMessage(){ // form event listener
  //ev.preventDefault();
  let url = 'services/getMessage.php?+count='+15;
  fetchFromJson(url)
  .then(processAnswer)
  .then(displayMessage, displayErrorMessage);
}



function displayMessage(message){

  let cible = document.querySelector('section#detail>div.message');
  cible.textContent ='';
  for (let i=0; i<message.length; i++){
    //console.log(message[i]);

    let header = document.createElement('h3');
    let image = document.createElement('img');
    image.className = 'mon_avatar';
    cible.appendChild(image);
    updateAvatar3(message[i].author);
    let span = document.createElement('span');
    header.className = message[i].author;
    cible.appendChild(span);
    //header.textContent = `<span class='${message[i].author}'>${message[i].author}</span>`;
    header.textContent = message[i].author;
    //header.className = message[i].author;
    //cible.appendChild(header);
    span.appendChild(header);
    let h4 = document.createElement('h4');
    h4.textContent = message[i].datetime;
    cible.appendChild(h4);
    let field = document.createElement('fieldset');
    let author = document.createElement('legend');
    author.textContent = message[i].pseudo;
    field.appendChild(author);
    let p = document.createElement('p');
    p.textContent = message[i].content;
    field.appendChild(p)
    cible.appendChild(field);
    //profileAuthor(span);



    // p.innerHTML =
    //   `<span>${message[i].author}</span>
    //    <span> ${message[i].pseudo}</span>
    //    <span> ${message[i].datetime}</span>
    //    <span> ${message[i].content}</span>
    //      `;


      //cible.appendChild(p);
     }
     //initMessage()
     for (let elt of document.querySelectorAll('.message>span')){
         console.log(elt.children.length);
         console.log(elt.children);
          let id_button = elt.children;
          console.log(id_button);
          id_button[0].addEventListener("click",selection_author);
         }
}

function etatProfile(){
  // for (let elt of document.querySelectorAll('.message'))
  //     elt.hidden=true;
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
      elt.hidden=false;
  for (let elt of document.querySelectorAll('.message_author'))
      elt.hidden=false;
  for (let elt of document.querySelectorAll('.modification'))
      elt.hidden=true;
  for (let elt of document.querySelectorAll('.messageFindUser'))
      elt.hidden=true;

}

function profileAuthor(){ // form event listener
  //ev.preventDefault();
  if (select_author !=null){
    let url = 'services/getProfile.php?login='+select_author.className;
    fetchFromJson(url)
    .then(processAnswer)
    .then(displayAuthor, displayErrorMessage);
  }
}

function displayAuthor(message){
  etatProfile()
  console.log(message[0].usersId);
  let cible = document.querySelector('section#detail>div.profile');
  let header = document.createElement('h3');
  let image = document.createElement('img');
  image.className = 'mon_avatar';
  cible.appendChild(image);
  updateAvatar4(message[0].usersId);
  header.textContent = message[0].usersId;
  cible.appendChild(header);
  let h5 = document.createElement('h5');
  h5.textContent = '@'+message[0].pseudo;
  cible.appendChild(h5);
  let field = document.createElement('fieldset');
  let author = document.createElement('legend');
  author.textContent = 'description';
  field.appendChild(author);
  let p = document.createElement('p');
  p.textContent = message[0].description;
  field.appendChild(p)
  cible.appendChild(field);
  h2 = document.createElement('h2');
  h2.textContent = "Message publier";
  cible.appendChild(h2);
}

function messageAuthor(){ // form event listener
  //ev.preventDefault();
  if (select_author !=null){
    let url = 'services/findMessages.php?login='+select_author.className+'&before='+1000+'&count='+10;
    fetchFromJson(url)
    .then(processAnswer)
    .then(displayMessage1, displayErrorMessage);
  }
}
function displayMessage1(message){

  let cible = document.querySelector('section#detail>div.message_author');
  cible.textContent ='';
  for (let i=0; i<message.length; i++){
    //console.log(message[i]);

    let header = document.createElement('h3');
    let image = document.createElement('img');
    image.className = 'mon_avatar';
    cible.appendChild(image);
    updateAvatar5(message[i].author);
    let span = document.createElement('span');
    header.className = message[i].author;
    cible.appendChild(span);
    //header.textContent = `<span class='${message[i].author}'>${message[i].author}</span>`;
    header.textContent = message[i].author;
    //header.className = message[i].author;
    //cible.appendChild(header);
    span.appendChild(header);
    let h4 = document.createElement('h4');
    h4.textContent = message[i].datetime;
    cible.appendChild(h4);
    let field = document.createElement('fieldset');
    let author = document.createElement('legend');
    author.textContent = message[i].pseudo;
    field.appendChild(author);
    let p = document.createElement('p');
    p.textContent = message[i].content;
    field.appendChild(p)
    cible.appendChild(field);
  }
}


function updateAvatar3(login) {
    let changeAvatar = function(blob) {
      if (blob.type.startsWith('image/')){ // le mimetype est celui d'une image
        let img = document.querySelectorAll('section#detail>div.message>img.mon_avatar');
        for (i=0; i<img.length; i++)
          img[i].src = URL.createObjectURL(blob);
      }
    };
  fetchBlob('services/getAvatar.php?login='+login+'&size=small')
    .then(changeAvatar);
}
function updateAvatar5(login) {
    let changeAvatar = function(blob) {
      if (blob.type.startsWith('image/')){ // le mimetype est celui d'une image
        let img = document.querySelectorAll('section#detail>div.message_author>img.mon_avatar');
        for (i=0; i<img.length; i++)
          img[i].src = URL.createObjectURL(blob);
      }
    };
  fetchBlob('services/getAvatar.php?login='+login+'&size=small')
    .then(changeAvatar);
}

function updateAvatar4(login) {
    let changeAvatar = function(blob) {
      if (blob.type.startsWith('image/')){ // le mimetype est celui d'une image
        let img = document.querySelectorAll('section#detail>div.profile>img.mon_avatar');
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
  let cible  = document.querySelector('section#detail>div.message');
  cible.textContent=''; // effacement
  cible.appendChild(p);
}

function selection_author(){
  select_author = this;
  this.class= this.class;
  console.log(select_author.className);
  if (select_author != null){
    profileAuthor();
    messageAuthor()
    //etatProfile()
  }
}
