<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr" xml:lang="fr">
    <head>
        <meta charset="UTF-8" />
        <title>Erreur</title>
        <style>
            #error {
                margin : 10pt;
                padding : 5pt;
                border : solid red 1pt;
            }
        </style>
    </head>
    <body>
        <p id="error">Erreur :
        <?php
            echo $errorMessage;
        ?>
        </p>
    </body>
</html>
