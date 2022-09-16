// Récuperer tout les éléments 
let resetBtn = document.getElementById('reset');
let scoreJoueur = document.getElementById('scoreJoueur');
let scoreOrdinateur = document.getElementById('scoreOrdinateur');
let btnJoueur = [...document.getElementsByClassName("btn-joueur")]; //[...}  Met tout les élément dans un tableau
let opierreBtn = document.getElementById('opierre');
let ofeuilleBtn = document.getElementById('ofeuille');
let ociseauxBtn = document.getElementById('ociseaux');
let message = document.getElementById('message');
let nextBtn = document.getElementById('next');

const jouerManche = (e) => {
    let choix = e.target.closest(".btn-joueur") //event . target. l'élément le plus proche qui possède la classe btn-joueur


    btnJoueur.forEach(btn => { // Si on clique sur un bouton c'est comme si il devient désactivé grace à la classe css
        btn.classList.add("desactivated");
        btn.removeEventListener('click', jouerManche); //dès qu'on clique sur un bouton on l'enlève sur tout les boputons pour ne plus pouvoir cliquer sur un bouton
    });
    choix.classList.remove('desactivated') //on enlève la classe désactivated
    choix.classList.add('active') //dès qu'un bouton a la classe active il est séléctionner en couleur grâce au css

    //Récupération de la valeur du bouton choisi par le joueur
    let choixJoueur = choix.id;

    //Récupération de la valeur du bouton choisi par l'ordi
    let choixOrdi = faireChoixOrdinateur();

    verifierGagnant(choixJoueur, choixOrdi);
    if (scoreJoueur.textContent == "5"){
        message.textContent = "Tu as battu le noob d'ordinateur";
        nextBtn.style.visibility = "hidden";
    }else if(scoreOrdinateur.textContent == "5") {
        message.textContent ="T'es trop nul(le)";
        nextBtn.style.visibility = "hidden";
    } else {
        nextBtn.style.visibility = "visible";
    }
}

const PIERRE = "pierre";
const FEUILLE = 'feuille';
const CISEAUX = 'ciseaux';



//Choix de l'ordi en générant un nombre aléatoire
const faireChoixOrdinateur = () => {
    // 0 = pierre 1 = feuille et 2 = ciseaux
    let nbAleatoire = Math.floor(Math.random() * 3); // math random => créer un nombre aléatoire avec 0 inclus et 1 exclus mathfloor=> arrondi. Pour que math.random aille jusqu'à trois il suffit de l'a multiplier par 3

    switch (nbAleatoire) {
        case 0: //Si c'est pierre alors le pierre devient active et on return "pierre"
            opierreBtn.classList.add("active");
            return PIERRE;
        case 1:
            ofeuilleBtn.classList.add("active");
            return FEUILLE;
        default: // si c'est pas les deux premiers cas alors par défault c'est 
            ociseauxBtn.classList.add("active");
            return CISEAUX
    }
}

const verifierGagnant = (choixJoueur, choixOrdi) => { // const qui est égale à une fonction
    if (choixJoueur == choixOrdi) {
        message.textContent = "Egalité !"; //changer la valeur du message, par défaut il est à "a vous de jouer"
        return;
    }
    //comparer avec le choix de l'ordi
    if (choixJoueur == PIERRE) {
        if (choixOrdi == FEUILLE) {
            return victoireOrdi();
        } else if (choixOrdi == CISEAUX) {
            return victoireJoueur();
        }
    }

    if (choixJoueur == FEUILLE) {
        if (choixOrdi == PIERRE) {
            return victoireJoueur();
        } else if (choixOrdi == CISEAUX) {
            return victoireOrdi();
        }
    }

    if (choixJoueur == CISEAUX) {
        if (choixOrdi == FEUILLE) {
            return victoireJoueur();
        } else if (choixOrdi == PIERRE) {
            return victoireOrdi();
        }
    }


};

const victoireOrdi = () => { //Si l'ordi gagne on change le message
    message.textContent = "Le noob d'ordinateur gagne ..."
    scoreOrdinateur.textContent++; //Incrémente le score de l'ordi 
}
const victoireJoueur = () => { //Si le joueur gagne on change le message
    message.textContent = "Tu as gagné !!"
    scoreJoueur.textContent++; //Incrémente le score de l'ordi 
}

//Nouvelle manche
const preparerNouvelleManche = () => { //On enlève toutes les classes des boutons
    btnJoueur.forEach((btn => {
        btn.classList.remove("desactivated");
        btn.classList.remove("active");

        btn.addEventListener("click", jouerManche); //au clique on appelle la fonction jouerManche
    }));
    nextBtn.style.visibility = "hidden"; //On veut recacher le bouton tour suivants

    //On enlève les classes des boutons
    opierreBtn.classList.remove("active"); //si c'est ce bouton qui à été choisi par l'ordinateur
    ofeuilleBtn.classList.remove("active"); //si c'est ce bouton qui à été choisi par l'ordinateur
    ociseauxBtn.classList.remove("active"); //si c'est ce bouton qui à été choisi par l'ordinateur

    message.textContent = " A vous de jouer !";
};

nextBtn.addEventListener("click", preparerNouvelleManche) //Ce passe qqchose quand on clique dessus, on appelle la fonction preparerNouvelleManche

//Pour tt les boutons du joueur
btnJoueur.forEach((btn) => btn.addEventListener("click", jouerManche))
resetBtn.addEventListener("click", redemarre)


//On remet les scores à 0 
function redemarre() {
    scoreJoueur.textContent = "0"
    scoreOrdinateur.textContent = "0"
    preparerNouvelleManche()
}
