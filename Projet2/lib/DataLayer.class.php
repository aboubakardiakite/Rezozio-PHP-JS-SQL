<?php
require_once("lib/db_parms.php");

Class DataLayer{
    private $connexion;
    public function __construct(){

            $this->connexion = new PDO(
                       DB_DSN, DB_USER, DB_PASSWORD,
                       [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
                       ]
                     );
            //$this->connexion->query("SET search_path = public,s8");


    }



   /*
    * Test d'authentification
    * $login, $password : authentifiants
    * résultat :
    *    Instance de Personne représentant l'utilsateur authentifié, en cas de succès
    *    NULL en cas d'échec
    */
   function authentifier($login, $password){ // version password hash
        $sql = <<<EOD
        select
        login, pseudo, password
        from rezozio.users
        where login = :login
EOD;
        $stmt = $this->connexion->prepare($sql);
        $stmt->bindValue(':login', $login);
        $stmt->execute();
        $info = $stmt->fetch();
        if ($info && crypt($password, $info['password']) == $info['password'])
              return new Users($info['login'], $info['pseudo']);
        else
          return NULL;
    }

   /*
    * Récupère l'avatar d'un utilisateur
    * $login : login de l'utilisateur
    * résultat :
    *   si l'utilisateur existe : table assoc
    *    'mimetype' : mimetype de l'image
    *    'data' : flux ouvert en lecture sur les données binaires de l'image
    *     si l'utilisateur n'a pas d'avatar, 'mimetype' et 'data' valent NULL
    *   si l'utilisateur n'existe pas : le résultat vaut NULL
    */
   function getAvatar($login, $size){
      $sql = <<<EOD
      select avatar_small, avatar_large, avatar_type
      from rezozio.users
      where login=:login
EOD;
      $stmt = $this->connexion->prepare($sql);
      $stmt->bindValue(':login', $login);
      $stmt->bindColumn('avatar_type', $avatar_type);
      $stmt->bindColumn('avatar_small', $flow1, PDO::PARAM_LOB);
      $stmt->bindColumn('avatar_large', $flow2, PDO::PARAM_LOB);
      $stmt->execute();
      $res = $stmt->fetch();
      if ($res)
        if ($size == "large")
          return ['avatar-type'=>$avatar_type,'data'=>$flow2];
        else
          return ['avatar-type'=>$avatar_type,'data'=>$flow1];
      else
         return false;
    }

    function getUser($userId){
      $sql = <<<EOD
      select login, pseudo from rezozio.users
      where login = :login
EOD;
      $stmt = $this->connexion->prepare($sql);
      $stmt->bindValue(':login', $userId);
      $stmt->execute();
      $info = $stmt->fetch();
      if ($info)
        return new Users($info['login'], $info['pseudo']);
      return NULL;
    }

    function getMessage($MessageId){
      $sql = <<<EOD
      select id, author, content, datetime from rezozio.messages
      where id=:id
EOD;
      $stmt = $this->connexion->prepare($sql);
      $stmt->bindValue(':id', $MessageId);
      $stmt->execute();
      $info = $stmt->fetch();
      return $info;
    }

    function createUser($userId, $password, $pseudo){
      $sql =<<<EOD
      insert into rezozio.users (login,pseudo,password) values(:login,:pseudo,:password)
EOD;
      $stmt = $this->connexion->prepare($sql);
      $stmt->bindValue(':login',$userId);
      $scriptPassword = password_hash($password,  CRYPT_BLOWFISH);
      $stmt->bindValue(':password',$scriptPassword);
      $stmt->bindValue(':pseudo',$pseudo);

      try{
        $stmt->execute();
        return new Users($userId, $pseudo);
      }catch (PDOException $e){
        return NULL;
      }
    }
    function findUsers($searchedString){

//       $sql = <<<EOD
//       select login, pseudo from rezozio.users where login like $searchedString or pseudo like $searchedString
// EOD;
      $sql =<<<EOD
      select login, pseudo from rezozio.users
EOD;

      $stmt = $this->connexion->prepare($sql);
      //$stmt->bindValue(':login', $userId);
      $stmt->execute();
      $res = $stmt->fetchAll();
      $resultat = array();
      // if ($info)
      //   return new Users($info['login'], $info['pseudo']);
      // return NULL;
      for ($i=0; $i<count($res); $i++){
        if ((strpos($res[$i]["login"], $searchedString)!==FALSE)||(strpos($res[$i]["pseudo"], $searchedString)!==FALSE)){
          $resultat[] = $res[$i];
        }
      }
      return $resultat;
    }

    function Messages($count){
      $sql =<<<EOD
      select messages.id, messages.author, users.pseudo, messages.content, messages.datetime
      from rezozio.messages,rezozio.users
      where users.login = messages.author
      order by datetime desc
      limit :count
EOD;
      $stmt = $this->connexion->prepare($sql);
      $stmt->bindValue(':count',$count);
      $stmt->execute();
      return $stmt->fetchAll();
    }
    function getMessageBefore($before,$count){
      $sql =<<<EOD
      select messages.id, messages.author, users.pseudo, messages.content, messages.datetime
      from rezozio.messages,rezozio.users
      where users.login = messages.author and id <:before
      order by messages.datetime desc
      limit :count
EOD;
      $stmt = $this->connexion->prepare($sql);
      $stmt->bindValue(':count',$count);
      $stmt->bindValue(':before',$before);
      $stmt->execute();
      return $stmt->fetchAll();
    }
  function findMessages($author,$before,$count){

      $sql = <<<EOD
      select rezozio.messages.id, rezozio.messages.author, rezozio.users.pseudo, rezozio.messages.content, rezozio.messages.datetime
      from rezozio.users, rezozio.messages
      where rezozio.users.login = rezozio.messages.author
      order by datetime desc
      limit :count
EOD;
      $stmt = $this->connexion->prepare($sql);
      $stmt->bindValue(':count',$count);
      $stmt->execute();
      $res = $stmt->fetchALL();
      $resultat = array();
      if (($before=='')&&($author=='')){
        return $res;
      }
      else if (($before !='')&&($author=='')){
        for ($i=0; $i<count($res); $i++){
          if($res[$i]["message.id"]<$before){
            return $res[$i];
          }
        }
      }
      else if (($before !='')&&($author!='')){
        for ($i=0; $i <count($res) ; $i++) {
          if($res[$i]["author"]==$author){
            $resultat[]= $res[$i];
          }
        }
      }
      else{
        for ($i=0; $i <count($res) ; $i++) {
          if (($res[$i]["author"]==$author)&&($res[$i]["id"]<$before)) {
            $resultat[]= $res[$i];
          }
        }
      }
      return $resultat;
  }
  function uploadAvatar($type,$small,$large){  //verif
      $sql = "update rezozio.users set avatar_type = :type, avatar_small = :small avatar_large = :large
      where id = :current";
      $stmt = $this->connexion->prepare($sql);
      $stmt->bindValue(':current', $_SESSION['ident']->login);
      $stmt->bindValue(':type',$type);
      $stmt->bindValue(':small',$small);
      $stmt->bindValue(':large',$large);
      $stmt->execute();
      return True;
    }

  function getProfile($userId){
    $sql = <<<EOD
    select users.login as "usersId", users.pseudo, users.description
    from rezozio.users
    where rezozio.users.login = :userId
EOD;

    $stmt = $this->connexion->prepare($sql);
    $stmt->bindValue(':userId', $userId);
    $stmt->execute();
    return $stmt->fetchALL();
  }

  function getProfile2($userId){
    $sql = <<<EOD
    select users.login as "usersId", users.pseudo, users.description
    from rezozio.users
    where rezozio.users.login = :userId
EOD;
    $stmt = $this->connexion->prepare($sql);
    $stmt->bindValue(':userId', $userId);
    $stmt->execute();
    $res =$stmt->fetchALL();
    $res2 = $this->getSubsscriptions();
    $res3 = $this->getFollowers();
    $cpt =0;
    $cmp =0;
    if ($res !=[]){
      for ($i=0; $i<count($res2); $i++){
        if ($res2[$i]["userId"]==$res[0]["userId"]){
          $cpt+=1;
        }
      }
      if ($cpt!=0){
        $res[0]["followed"] = true;
      }
      else{
        $res[0]["followed"] = false;
      }
      for ($i=0; $i<count($res3); $i++){
        if ($res3[$i]["userId"] ==$userId){
          $cmp +=1;
        }
      }
      if ($cmp!=0){
        $res[0]['isFollower'] = true;
      }
      else{
        $res[0]['isFollower'] = false;
      }
      return $res;

    }
  }
 function findFollowedMessages($before, $count){
   $sql =<<<EOD
   select messages.id as "messageId", messages.author, users.pseudo, messages.content, messages.datetime
   from rezozio.messages, rezozio.users, rezozio.subscriptions
   where rezozio.users.login = rezozio.messages.author and rezozio.subscriptions.follower =:current and rezozio.subscriptions.target= rezozio.messages.author
   order by datetime desc
   limit :count
EOD;
   $stmt = $this->connexion->prepare($sql);
   $stmt->bindValue(':count',$count);
   $stmt->bindValue(':current',$_SESSION['ident']->login);
   $stmt->execute();
   $res = $stmt->fetchAll();
   if ($before ==''){
     return $res;
   }
   else{
     for ($i=0; $i < count($res); $i++) {
       if ($res[$i]["messageId"]<$before){
         $resultat[] = $res[$i];
       }
     }
   }
   return $resultat;
 }

 function postMessage($source){
      $sql = 'insert into rezozio.messages (author, content) values ((select users.login from rezozio.users where users.login = :author), :content)';
      $stmt = $this->connexion->prepare($sql);
      $stmt->bindValue(':author', $_SESSION['ident']->login);
      $stmt->bindValue(':content', $source);
      $stmt->execute();
      return True;
    }
  function setProfile($password, $pseudo, $description){  //verif
      $sql1 = 'update rezozio.users set description = :description where login = :current';
      $sql3 = 'update rezozio.users set pseudo = :pseudo where login = :current';
      $sql2 = 'update rezozio.users set password = :password where login = :current';
      $stmt1 = $this->connexion->prepare($sql1);
      $stmt1->bindValue(':current', $_SESSION['ident']->login);
      $stmt1->bindValue(':description', $description);
      $stmt2 = $this->connexion->prepare($sql2);
      $stmt2->bindValue(':current', $_SESSION['ident']->login);
      $scriptPassword = password_hash($password,  CRYPT_BLOWFISH);
      $stmt2->bindValue(':password',$scriptPassword);
      //$stmt2->bindValue(':password', $password);
      $stmt3 = $this->connexion->prepare($sql3);
      $stmt3->bindValue(':current', $_SESSION['ident']->login);
      $stmt3->bindValue(':pseudo', $pseudo);
      $stmt1->execute();
      $stmt2->execute();
      $stmt3->execute();
      $sql =<<<EOD
        select login, pseudo from rezozio.users
            where login = :current
EOD;
      $stmt = $this->connexion->prepare($sql);
      $stmt->bindValue(':current', $_SESSION['ident']->login);
      $stmt->execute();
      $info = $stmt->fetch();
      if ($info)
        return new Users($info['login'], $info['pseudo']);
      return NULL;
    }
function setProfile1($password, $pseudo, $description){

  $sql=<<<EOD
  UPDATE rezozio.users
  SET password = (
    CASE
      WHEN :password != '' THEN :password
      ELSE password
    END
  ),
  pseudo = (
    CASE
      WHEN :pseudo != '' THEN :pseudo
      ELSE pseudo
    END
  ),
  description = (
    CASE
      WHEN :description != '' THEN :description
      ELSE description
    END
  )
  where login = :current
  returning login as "userId", pseudo
EOD;
  $stmt = $this->connexion->prepare($sql);
  $stmt->bindValue(':password',$password);
  $stmt->bindValue(':pseudo',$pseudo);
  $stmt->bindValue(':description',$description);
  $stmt->bindValue(':current', $_SESSION['ident']->login);
  $stmt->execute();
  return $stmt->fetchALL();

}

 function follow($target){
   $sql =<<<EOD
   insert into rezozio.subscriptions (follower, target) values
   ((select login from rezozio.users where login = :current),
   (select login from rezozio.users where users.login = :target))
EOD;
   $stmt = $this->connexion->prepare($sql);
   $stmt->bindValue(':target', $target);
   $stmt->bindValue(':current', $_SESSION['ident']->login);
   $stmt->execute();
   return True;
 }

 function unfollow($target){
   $sql = <<<EOD
   select target from rezozio.subscriptions where subscriptions.target= :target
EOD;
  $stmt = $this->connexion->prepare($sql);
  $stmt->bindValue(':target', $target);
  $stmt->execute();
  $info = $stmt->fetch();
  if ($info){
    $sql = <<<EOD
    delete from rezozio.subscriptions where subscriptions.follower= :current and
     subscriptions.target= :target
EOD;
    $stmt = $this->connexion->prepare($sql);
    $stmt->bindValue(':target', $target);
    $stmt->bindValue('current', $_SESSION['ident']->login);
    $stmt->execute();
    return True;
  }
  else{
    return NULL;
  }

 }
 function getSubsscriptions(){
   $sql = <<<EOD
   select rezozio.subscriptions.target as "userId", rezozio.users.pseudo
   from rezozio.subscriptions join rezozio.users on rezozio.subscriptions.target = rezozio.users.login
   where rezozio.subscriptions.follower =:current
EOD;
  $stmt = $this->connexion->prepare($sql);
  $stmt->bindValue(':current', $_SESSION['ident']->login);
  $stmt->execute();
  return $stmt->fetchAll();

  }
 function getFollowers(){
  $sql =<<< EOD
  select rezozio.subscriptions.follower as "userId", rezozio.users.pseudo
  from rezozio.subscriptions join rezozio.users on rezozio.subscriptions.follower= rezozio.users.login
  where rezozio.subscriptions.target =:current
EOD;
  $stmt = $this->connexion->prepare($sql);
  $stmt->bindValue(':current', $_SESSION['ident']->login);
  $stmt->execute();
  $res = $stmt->fetchAll();
  $res2 = $this->getSubsscriptions();
  $resultat = array();
  for ($i=0; $i <count($res2) ; $i++) {
    if (count($res2) !=0){
      for ($j=0; $j <count($res2) ; $j++) {
        if ($res[$i]["userId"] == $res2[$j]['userId']){
          $res[$i]["mutual"] =true;
          $resultat[] = $res[$i];
        }
        else{
          $res[$i]["mutual"] = false;
          $resultat[] = $res[$i];
        }
      }
      }
      else{
        $res[$i]["mutual"] = false;
        $resultat[] = $res[$i];
      }
  }
  return $resultat;

}

}
