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
   
        console.log("Instantiation")

        // Récupération de la scène
        var scene = document.querySelector('a-scene');

        // Placement du guide
        var guide = document.createElement('a-obj-model');

        guide.setAttribute('id', this.id);   
        guide.setAttribute('src', "modeles/penguin/penguin.obj");
        guide.setAttribute('mtl', "modeles/penguin/penguin.mtl");
        guide.setAttribute('position', "-5 0 0")
        guide.setAttribute('scale', "2 2 2")
        guide.setAttribute('rotation', "-90 0 0")

        // Gestion du clic
        guide.addEventListener('click', onGuideClick);

        scene.appendChild(guide);

        // On le lance
       // var automate = new Automate(this, Waiting);
        //setInterval(automate.Execute());
    }




// Les transistions
    // Si l'utilisateur est perdu 
    userLost()
    {
        // Récupération de la caméra
        var camera = document.getElementById("camera");
        var guide = document.getElementById("guide");

        var positionCamera = camera.getAttribute('position');
        var positionGuide = guide.getAttribute('position');

        // Calcul de la distance dans l'espace
        var distance = Math.sqrt((positionCamera.x - positionGuide.x)*(positionCamera.x - positionGuide.x) + (positionCamera.y - positionGuide.y)*(positionCamera.y - positionGuide.y) +  (positionCamera.z - positionGuide.z)*(positionCamera.z - positionGuide.z));

        // Valeur arbitraire
        if(distance > 3.5)
        {
            return true;
        }     
        return false;        
}

    // Si l'utilisateur est bien avec le guide
    userWithGuide()
    {
        return !this.userLost();
    }

    // Si le pingouin a atteint sa cible  
    targetReached(targetName)
    {
        // On récupère la target à atteindre
        var target = document.getElementById(targetName);
        var guide = document.getElementById("guide");

        var positionTarget = target.getAttribute('position');
        var positionGuide = guide.getAttribute('position');

         // Calcul de la distance dans l'espace
        var distance = Math.sqrt((positionTarget.x - positionGuide.x)*(positionTarget.x - positionGuide.x) + (positionTarget.y - positionGuide.y)*(positionTarget.y - positionGuide.y) +  (positionTarget.z - positionGuide.z)*(positionTarget.z - positionGuide.z));
     
        // Valeur arbitraire
        if(distance <  3.5)
        {
            return true;
        }     
        return false;   

    }

    // Représente la fin de la visite
    endVisit()
    {
        // On veut arriver à la cheminée      
        return targetReached("cheminee");
    }    
};


var guide = new Guide("guide");
document.addEventListener("DOMContentLoaded", guide.Launch, false);
   
   
   function onGuideClick(e) 
        {
    alert(guide.userLost());
}