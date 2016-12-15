document.addEventListener("DOMContentLoaded", init, false);

var visitor = document.getElementById("camera");
var start = false;
var path = [];
var positionReached;
var target;
var nextTarget;
var objToReach;
var firstStart;

function init()
{   
    nextTarget = 0; 
    firstStart = true;  
}


function onGuideClick(e) 
{  
    start = true; 
    if(firstStart)
    {
        alert("Bonjour, je suis arrivé");
    }
    firstStart = false;
}

class Guide
{
    constructor(id)
    {
        this.id = id;
        // Récupération de la scène
        var scene = document.querySelector('a-scene');
        this.nbSpeakToUser = 0;

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
    }

    // GESTON DES ACTIONs DU GUIDE 
    // ==================================================================================
    setObjToReach(obj)
    {
        objToReach = obj;
    }

    hasLostVisitor()
    {
        this.nbSpeakToUser ++;
    }

    speak()
    {
        if(this.nbSpeakToUser<1)
        {
            alert("Bonjour et bienvenu pour cette visite. Veuillez me suivre tout le long pour que cette visite se passe au mieux")
        }
        else if(this.nbSpeakToUser==1)
        {
             alert("S'il vous plait, veuillez me suivre, il n'est pas conseillé de se promener tout seul.");
        }
        else if(this.nbSpeakToUser==2)
        {
             alert("S'il vous plait, Arretez de partir comme ça et suivez moi.");
        }
        else{
            alert("Bon ça suffit, j'arrête la visite.")
        }
        return true;
    }

    moveToVisitor()
    {
        this.lookAt(objToReach);
        var posobjToReach = objToReach.getAttribute('position');
        var rotObjToReach = objToReach.getAttribute("rotation");

        var guide =  document.getElementById("guide");
        var guidePos = guide.getAttribute("position");

        guidePos = setPosition(guidePos, posobjToReach);
        guide.setAttribute("position", guidePos);

        // Test pour savoir si la camera a atteint la position
        if(distance(posobjToReach, guidePos)<1.5)
        {
            //this.stopAnim();
            return true;
        }
    }

    moveToSphere()
    {
        var posobjToReach = objToReach.getAttribute('position');
        var guide =  document.getElementById("guide");
        var guidePos = guide.getAttribute("position");

        guidePos = setPosition(guidePos, posobjToReach);

        guide.setAttribute("position", guidePos);

        this.lookAt(objToReach);

        // Test pour savoir si la camera a atteint la position
        if(distance(posobjToReach, guidePos)<0.5)
        {
            guide.setAttribute("position", {x:posobjToReach.x, y:0, z:posobjToReach.z});
            nextTarget++;
            alert("Profiter de cet instant pour admirer.")
        }
    }

    lead()
    {
        var sphereBobEponge = document.getElementById("sphereBobEponge");
        var sphereLaitierePipe = document.getElementById("sphereLaitierePipe");
        var sphereFenetre = document.getElementById("sphereFenetre");
        var sphereMonsieurPomme = document.getElementById("sphereMonsieurPomme");  
        var sphereJeuneFillePerle = document.getElementById("sphereJeuneFillePerle");
        var sphereCheminee = document.getElementById("sphereCheminee");
        var sphereAccueil = document.getElementById("sphereAccueil");

        path = [sphereBobEponge, sphereLaitierePipe, sphereFenetre, sphereMonsieurPomme,sphereJeuneFillePerle,sphereCheminee,sphereAccueil]
        target = path[nextTarget];
        this.setObjToReach(target);
        this.moveToSphere();
    }

    lookAt(theTarget)
    {
        // quand l'user a une rotation de 0 le pingouin a une rotation de 45 
        var newRotation;
        var penguin = document.getElementById("guide");

        if(theTarget.getAttribute("id") == "camera")
        {
            var rotation = theTarget.getAttribute("rotation");    
            newRotation = {x:-90, y:rotation.y-90, z:0};
            penguin.setAttribute("rotation", newRotation);
        }
        else
        {
            var rotation =document.getElementById("camera").getAttribute("rotation"); 
            newRotation = {x:-90, y:rotation.y + 90, z:0};
            penguin.setAttribute("rotation", newRotation);
        }
        
    }

    // Action du guide 

    // GESTION DES TRANSITIONS 
    // ==========================================================================
    // si l'utilisateur est là 
    userIsHere()
    {
        return start;
    }

    // Si on a perdu l'utilisateur
    userLost()
    {
        // Récupération de la caméra
        var camera = document.getElementById("camera");
        var guide = document.getElementById("guide");

        var positionCamera = camera.getAttribute('position');
        var positionGuide = guide.getAttribute('position');

        // Valeur arbitraire
        if(distance(positionCamera, positionGuide) > 6)
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

    // Représente la fin de la visite
    endVisit()
    {
        // On veut arriver à la cheminée      
        return targetReached("cheminee");
    }    
};

function distance(a,b)
{
    return Math.sqrt((a.x - b.x)*(a.x - b.x) +  (a.z - b.z)*(a.z - b.z));
}

function setPosition(myPos, posToReach)
{
    if (myPos.x > posToReach.x + 0.5)
    {
        myPos.x-=0.08;
    }
    else if(myPos.x < posToReach.x - 0.5)
    {
        myPos.x += 0.08;
    }
    else
    {
        myPos.x = posToReach.x;
    }
    // Gestion de la position en Z
    if (myPos.z > posToReach.z + 0.5)
    {
        myPos.z -= 0.08;
    }
    else if(myPos.z < posToReach.z - 0.5)
    {
        myPos.z += 0.08;
    }
    else
    {
        myPos.z = posToReach.z;
    }

    return myPos;
}