//document.addEventListener("DOMContentLoaded", init, false);

class Guide
{
    constructor(name, posX, posY, posZ)
    {
        this.name = name;
        this.position = {"x": posX, "y":posY, "z":posZ};
        this.rotation = {"x":-90, "y":-90, "z":-90};
        this.scale = {"x": 2.0, "y": 2.0, "z":2.0};
        
        this.scene = document.querySelector('a-scene');        
        var guide = document.createElement('a-obj-model');     

        guide.setAttribute('id', this.name);
     
        guide.setAttribute('src', "modeles/penguin/penguin.obj");
        guide.setAttribute('mtl', "modeles/penguin/penguin.mtl" );

        guide.setAttribute('position', this.position);   
        guide.setAttribute('rotation', this.rotation);
        guide.setAttribute('scale', this.scale);  

        guide.addEventListener('click', onGuideClick);

        this.scene.appendChild(guide);
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
        alert(distance);

        // Valeur arbitraire
        if(distance > 3)
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

    isHere()
    {
        return true;
    }

    // Si le pingouin a atteint sa cible  
    targetReached(targetName)
    {
        // On récupère la target à atteindre
        var target = document.getElementById(targetName);
        var guide = document.getElementById("panda");

        var positionTarget = target.getAttribute('position');
        var positionGuide = guide.getAttribute('position');

         // Calcul de la distance dans l'espace
        var distance = sqrt((positionTarget.x - positionGuide.x)*(positionTarget.x - positionGuide.x) + (positionTarget.y - positionGuide.y)*(positionTarget.y - positionGuide.y) +  (positionTarget.z - positionGuide.z)*(positionTarget.z - positionGuide.z));
        
        // Valeur arbitraire
        if(distance < 1)
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

class Automate
{
    // Architecture de l'automate qui va servir au pingouin
    constructor(acteur, currentState)
    {
        this.fsm = this;
        this.Acteur = acteur;
        this.CurrentState = currentState;
        this.CurrentState.enter(this);
        this.PreviousState = null;
    }

    // Ce qui va faire évoluer l'état de l'automate 
    Execute()
    {
        this.CurrentState.execute(this);
    }
    // Ce qui va changer l'état de l'automate
    ChangeState(NewState)
    {
        this.PreviousState = this.CurrentState;
        this.CurrentState.exit();
        this.CurrentState = NewState;
        this.CurrentState.enter(this);
    }

    RevertToPreviousState()
    {
        this.ChangeState(self.PreviousState);
    }
}


var guide = new Guide("guide", 4.0,0.0,0.0);
var fsm = new Automate(guide, waiting);


 function onGuideClick(e) 
{
    alert(guide.userLost());
}

