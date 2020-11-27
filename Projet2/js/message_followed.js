//select_author=null;
//
// window.addEventListener('load',initMessageFollower);
//
// function initMessageFollower(){
//   sendMessageFollower();
// }

function processAnswer(answer){
  if (answer.status == "ok")
    return answer.result;
  throw new Error(answer.message);
}

function sendMessageFollower(){
  let url = 'services/findFollowedMessages.php?before='+1000+'&count='+3;
  fetchFromJson(url)
  .then(processAnswer)
  .then(displayMessageFollower, displayErrorMessageFollower);
}



function displayMessageFollower(message){
  if (message !=null){
    let cible = document.querySelector('section#detail>div.message_Follower');
    cible.textContent ='';
    for (let i=0; i<message.length; i++){
      //console.log(message[i]);
      let header = document.createElement('h3');
      let image = document.createElement('img');
      image.className = 'mon_avatar';
      cible.appendChild(image);
      updateAvatar2(message[i].author);
      let span = document.createElement('span');
      cible.appendChild(span);
      header.textContent = message[i].author;
      header.className = message[i].author;
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


    // p.innerHTML =
    //   `<span>${message[i].author}</span>
    //    <span> ${message[i].pseudo}</span>
    //    <span> ${message[i].datetime}</span>
    //    <span> ${message[i].content}</span>
    //      `;


      //cible.appendChild(p);
     }
   }
   for (let elt of document.querySelectorAll('.message_Follower>span')){
       console.log(elt.children.length);
       console.log(elt.children);
        let id_button = elt.children;
        console.log(id_button);
        id_button[0].addEventListener("click",selection_author);
       }
}

function updateAvatar2(login) {
    let changeAvatar = function(blob) {
      if (blob.type.startsWith('image/')){ // le mimetype est celui d'une image
        let img = document.querySelectorAll('section#detail>div.message_Follower>img.mon_avatar');
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
  let cible  = document.querySelector('section#detail>div.message_Follower');
  cible.textContent=''; // effacement
  cible.appendChild(p);
}

// function selection_author(){
//   select_author = this;
//   this.class= this.class;
//   console.log(select_author.className);
//   if (select_author != null){
//     profileAuthor();
//     messageAuthor()
//     //etatProfile()
//   }
// }
