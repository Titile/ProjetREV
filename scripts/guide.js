var visitor = document.getElementById("camera");

function onGuideClick(e) 
{  
    alert("Bonjour, je suis arrivé");
}

class Guide
{
    constructor(id)
    {
        this.id = id;
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
    }

    setPosition(x, y, z)
    {
      this.position = {"x": x, "y":y, "z":z};
      var guide = document.getElementById(this.id);
      guide.setAttribute('position', this.position);
    }

    getVisitorDistance()
    {
        var cameraPosition = visitor.getAttribute("position")
        var distance = Math.sqrt((this.position.x - cameraPosition.x)*(this.position.x - cameraPosition.x)+(this.position.z - cameraPosition.z)*(this.position.z - cameraPosition.z));
        return distance;
    }

    MoveToVisitor()
    {
        var visitorPosition = document.getElementById("camera").getAttribute("position");
        var guide =  document.getElementById("guide");
        var guidePos = guide.getAttribute("position");

        if (guidePos.x > visitorPosition.x + 0.5)
        {
            guidePos.x-=0.1;
        }
        else if(guidePos.x < visitorPosition.x - 0.5)
        {
            guidePos.x += 0.1;
        }
        else
        {
            guidePos.x = visitorPosition.x;
        }
        // Gestion de la position en Z
        if (guidePos.z > visitorPosition.z + 0.5)
        {
            guidePos.z -= 0.1;
        }
        else if(guidePos.z < visitorPosition.z - 0.5)
        {
            guidePos.z += 0.1;
        }
        else
        {
            guidePos.z = visitorPosition.z;
        }

        guide.setAttribute("position", guidePos);

        // Test pour savoir si la camera a atteint la position
        if (Math.sqrt((visitorPosition.x - guidePos.x)*(visitorPosition.x -guidePos.x) +(visitorPosition.z - guidePos.z)*(visitorPosition.x -guidePos.x))<1)
        {
            return true;
        }
    }

    // Action du guide 

    // Les transistions
    // si l'utilisateur est là 
    userIsHere()
    {
        return true;
    }

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
