class Automate
{
    // Architecture de l'automate qui va servir au pingouin
    constructor(acteur, currentState)
    {
        this.Acteur = acteur;
        this.CurrentState = currentState;
        this.CurrentState.enter();
        this.PreviousState = null;

    }

    // Ce qui va faire évoluer l'état de l'automate 
    Execute(Acteur)
    {
        this.CurrentState.execute();
    }
    // Ce qui va changer l'état de l'automate
    ChangeState(NewState)
    {
        this.PreviousState = this.CurrentState;
        this.CurrentState.exit();
        this.CurrentState = NewState;
        this.CurrentState.enter();
    }

    RevertToPreviousState()
    {
        this.ChangeState(self.PreviousState);
    }
}


class Guide
{
    constructor(id)
    {
        this.id = id;
    }

    Launch()
    {
        console.log("Instantiation")

         // Instanciation du pingouin
        var scene = document.querySelector('a-scene');

        var panda = document.createElement('a-obj-model');

        panda.setAttribute('id', this.id);

        panda.setAttribute('position', document.getElementById("panda").getAttribute("position"));
        panda.setAttribute('rotation', this.rotate);
        panda.setAttribute('scale', this.scale);

        panda.setAttribute('src', "modeles/penguin/penguin.obj");
        panda.setAttribute('mtl', "modeles/penguin/penguin.mtl");
        panda.setAttribute('position', "-5 0 0")
        panda.setAttribute('scale', "2 2 2")
        panda.setAttribute('rotation', "-90 0 0")

        // Gestion du clic
        panda.addEventListener('click', onGuideClick);

        scene.appendChild(panda);

        // On le lance
        var automate = new Automate(this);
        setInterval(automate.Execute());
    }




// Les transistions
    // Si l'utilisateur est perdu 
    userLost()
    {
        // Récupération de la caméra
        var camera = document.getElementById("camera");

        // Calcul de la distance dans l'espace
        var distance = sqrt((camera.getAttribute('position').x - document.getElementById("panda").getAttribute("position").x)*(camera.getAttribute('position').x - document.getElementById("panda").getAttribute("position").x) + (camera.getAttribute('position').y - document.getElementById("panda").getAttribute("position").y)*(camera.getAttribute('position').y - document.getElementById("panda").getAttribute("position").y) +  (camera.getAttribute('position').z - document.getElementById("panda").getAttribute("position").z)*(camera.getAttribute('position').z - document.getElementById("panda").getAttribute("position").z))
        
        // Valeur arbitraire
        if(distance > 1)
        {
            return true;
        }     
        return false;        
    }

    // Lorsque le guide a atteint l'utilisateur
    userReached()
    {
        // Récupération de la caméra
        var camera = document.getElementById("camera");

        // Calcul de la distance dans l'espace
        var distance = Math.sqrt((camera.getAttribute('position').x - document.getElementById("panda").getAttribute("position").x)*(camera.getAttribute('position').x - document.getElementById("panda").getAttribute("position").x) + (camera.getAttribute('position').y - document.getElementById("panda").getAttribute("position").y)*(camera.getAttribute('position').y - document.getElementById("panda").getAttribute("position").y) +  (camera.getAttribute('position').z - document.getElementById("panda").getAttribute("position").z)*(camera.getAttribute('position').z - document.getElementById("panda").getAttribute("position").z))
        
        
        // Valeur arbitraire
        if(distance < 1)
        {
            return true;
        }     
        return false;   
    }

    // Si l'utilisateur est bien avec le guide
    userWithGuide()
    {
        return !userLost();
    }

    // Si le pingouin a atteint sa cible  
    targetReached(target)
    {
        
    }

    // La représente la fin de la visite
    endVisit()
    {

    }    
};

 function onGuideClick(e) 
        {
    alert(panda.userReached());
}

// Initialisation de la scène
//    constructor(id, sourceObj, sourceMtl,  position, scale, rotation)
//console.log("njfid");

//var panda = new Guide("panda", "modeles/panda/panda.obj","modeles/panda/panda.mtl", "0 0 0", "2 2 2", "0 0 0");
var panda = new Guide("panda");
document.addEventListener("DOMContentLoaded", panda.Launch, false);
   