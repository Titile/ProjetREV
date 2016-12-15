function onGuideClick(e) 
{  

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

    setPosition(x, y, z){
      this.position = {"x": x, "y":y, "z":z};

      var guide = document.getElementById(this.name);

      guide.setAttribute('position', this.position);
    }

    getVisitorDistance(){

        var cameraPosition = document.getElementById("camera").getAttribute("position")
        var distance = Math.sqrt((this.position.x - cameraPosition.x)*(this.position.x - cameraPosition.x)+(this.position.z - cameraPosition.z)*(this.position.z - cameraPosition.z));
        console.log("distance pigou camera: " + distance );
    }

    getCameraPosition(){
      return (document.getElementById("camera").getAttribute("position"));
    }

    // MoveToCamera(pigou)
    // {
    //   var cameraPosition = pigou.getCameraPosition();
    //   var pigouPos = pigou.position;

    //   if (pigouPos.x > cameraPosition.x + 0.5)
    //   {
    //       pigouPos.x-=0.1;
    //   }
    //   else if(pigouPos.x < cameraPosition.x - 0.5)
    //   {
    //       pigouPos.x += 0.1;
    //   }
    //   else
    //   {
    //       pigouPos.x = cameraPosition.x;
    //   }
    //   // Gestion de la position en Z
    //   if (pigouPos.z > cameraPosition.z + 0.5)
    //   {
    //       pigouPos.z -= 0.1;
    //   }
    //   else if(pigouPos.z < cameraPosition.z - 0.5)
    //   {
    //       pigouPos.z += 0.1;
    //   }
    //   else
    //   {
    //       pigouPos.z = cameraPosition.z;
    //   }


    //   pigou.setPosition(pigouPos.x, pigouPos.y, pigouPos.z);

    //   // Test pour savoir si la camera a atteint la position
    //   if (Math.abs(cameraPosition.x - pigou.position.x)<2 && Math.abs(cameraPosition.z - pigou.position.z)<2)
    //   {
    //       clearInterval(cameraReached);
    //   }
    // }

    // Action du guide 

    // Les transistions
    // si l'utilisateur est là 
    isHere()
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
