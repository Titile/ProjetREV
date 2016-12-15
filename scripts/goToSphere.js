document.addEventListener("DOMContentLoaded", init, false);
var scene = document.querySelector('a-scene');
var positionReached;
var positionBoule;
var objToMove;
var objReached; 
var nextTarget;
var rotation_obj;

function init() 
{    
    nextTarget = 0
    // Gestion du click sur une sphere
    document.getElementById("sphere-dir-1").addEventListener('click', onClickSphere)
    document.getElementById("sphere-dir-2").addEventListener('click', onClickSphere)
    document.getElementById("sphere-dir-3").addEventListener('click', onClickSphere)
    document.getElementById("sphere-dir-4").addEventListener('click', onClickSphere)
    document.getElementById("penguin").addEventListener('click', onClickGuide)
}

function onClickSphere(e)
{
    positionReached = setInterval(moveToSphere, 50);
    positionBoule = this.getAttribute("position")
    objToMove = document.getElementById("camera")
}

function onClickGuide(e)
{
    objToMove = document.getElementById("penguin")
    followTraj()
}

function followTraj()
{
    var sphere_1 =  document.getElementById("sphere-dir-1"); 
    var sphere_2 =  document.getElementById("sphere-dir-2"); 
    var sphere_3 =  document.getElementById("sphere-dir-3"); 
    var sphere_4 =  document.getElementById("sphere-dir-4"); 
    var trajectoire = [sphere_1, sphere_2, sphere_3, sphere_4]
  
    positionBoule = trajectoire[nextTarget].getAttribute("position")
    rotation_obj = objToMove.getAttribute("rotation")
    objToMove.setAttribute("rotation",rotation_obj)
    
    //objToMove.setAttribute("look-at", trajectoire[nextTarget])
    positionReached = setInterval(moveToSphere, 50)
}

function stopAnim()
{
    clearInterval(positionReached)

    nextTarget++
    if(nextTarget < 4)
    {
        rotation_obj.z += 90
        followTraj()
    }
    else 
    {
        nextTarget = 0
        rotation_obj.z += 90
        followTraj()
    }
}

// Fonction pour éviter les obstacles 
function avoidObstacle()
{

}

function moveToSphere()
{
    // Recuperation de la position de la camera
    var positionObj = objToMove.getAttribute("position")

    if (positionObj.x > positionBoule.x + 0.5) 
    {
        positionObj.x-=0.1;
    }
    else if(positionObj.x < positionBoule.x - 0.5) 
    {
        positionObj.x += 0.1;
    }
    else
    {
        positionObj.x = positionBoule.x
    }
    // Gestion de la position en Z
    if (positionObj.z > positionBoule.z + 0.5) 
    {
        positionObj.z -= 0.1;
    }
    else if(positionObj.z < positionBoule.z - 0.5)
    {
        positionObj.z += 0.1;
    }
    else 
    {
        positionObj.z = positionBoule.z
    }

    objToMove.setAttribute("position", positionObj)

    // Test pour savoir si la camera a atteint la position
    if (positionObj.x == positionBoule.x && positionObj.z == positionBoule.z)
    {
        stopAnim()
    }

}