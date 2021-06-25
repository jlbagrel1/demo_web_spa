function httpGet(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function httpPost(theUrl, data, callback)
{
  var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(JSON.parse(xmlHttp.responseText));
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader('Content-Type', 'application/json');
    xmlHttp.send(JSON.stringify(data))
}

function mettreAJourTicketsRestants() {
  httpGet("http://localhost:5000/tickets_restants", function (donnees) {
    var n = donnees.tickets;
    document.getElementById("tickets").textContent = new String(n);
    if (n === 0) {
      document.getElementById("bouton_reserver").disabled = true;
    } 
    else {
      document.getElementById("bouton_reserver").disabled = false;
    }
  });
  
}

setInterval(mettreAJourTicketsRestants, 1000)

function recup_donnees_formulaire () {
  var nom = document.getElementById("nom").value;
  var prenom = document.getElementById("prenom").value;
  return {
    nom: nom,
    prenom: prenom
  };
}

function reserver() {
  httpPost("http://localhost:5000/reserver", recup_donnees_formulaire(), function (donnees) {
    var numero = donnees.numero;
    var texte;
    if (numero == null) {
      texte = "Pas de chance, plus de tickets disponibles !";
    } else {
      texte = "Voici votre numéro de tickets: " + numero;
    }
    document.getElementById("resultat_reservation").textContent = texte;
  })
}

document.getElementById("bouton_reserver").addEventListener("click", reserver);
 