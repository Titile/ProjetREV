document.addEventListener("DOMContentLoaded", init, false);
var scene = document.querySelector('a-scene');
var acteurs = {};
var positionReached
var positionBoule


function init() {
    //alert("CRV");
    //var scene = document.querySelector('a-scene');
    //alert("Scene " + scene);
    tableau("t-01", "textures/Hokusai.jpg", "1 1 1", "0 2 0", "0 0 0");
    tableau("t-02", "textures/japan.jpg", "1,1,1", "5 1 0", "0 0 0");

    m1 = Mobile("m-01", "t-01");
    acteurs["m-01"] = m1

    m2 = Mobile("m-02", "t-02");
    acteurs["m-02"] = m2



    setInterval(anim, 50);
    /*
	document.getElementById("cube").addEventListener('mouseenter',onEnter);
	document.getElementById("cube").addEventListener('mouseleave',onLeave);
	document.getElementById("cube").addEventListener('click',onClick);
	*/

    // Gestion du click sur une sphère
    document.getElementById("sphere1").addEventListener('click', onClick)
    document.getElementById("sphere2").addEventListener('click', onClick)
    document.getElementById("sphere3").addEventListener('click', onClick)
  
}

function onClick(e)
{
    positionReached = setInterval(moveThatShit, 50);
    positionBoule = this.getAttribute("position")
    this.setAttribute('material', 'color', 'red');
}

function moveThatShit()
{
  
    // Récupération de la position de la caméra
    var positionCamera = document.getElementById("camera").getAttribute("position")

    if (positionCamera > positionBoule.x + 0.5)

    if (positionCamera < positionBoule. - 0.5)

    if (positionCamera.x > positionBoule.x) {
        positionCamera.x-=0.1;
    }
    else {
        positionCamera.x += 0.1;
    }
    // Gestion de la position en Z
    if (positionCamera.z > positionBoule.z) {
        positionCamera.z -= 0.1;
    }
    else {
        positionCamera.z += 0.1;
    }
    document.getElementById("camera").setAttribute("position", positionCamera)

    // Test pour savoir si la caméra a atteint la position
    if (positionCamera.x == positionBoule.x && positionCamera.z == positionBoule.z) clearInterval(positionReached)
}



function anim(dt) {
    var t = document.getElementById("t-01");
    var p = t.getAttribute("position");
    p.x += 0.1
    t.setAttribute("position", p);

}



function tableau(nom, src, scale, position, rotate) {
    var scene = document.querySelector('a-scene');
    var tableau = document.createElement('a-entity');
    tableau.setAttribute("id", nom);
    tableau.setAttribute('position', position);
    tableau.setAttribute('scale', scale);
    tableau.setAttribute('rotation', rotate);
    //tableau.addEventListener('mouseenter', handleEnter);
    //tableau.addEventListener('mouseleave', handleLeave);

    var t1 = document.createElement('a-box');
    t1.setAttribute('color', '#844B00');
    t1.setAttribute('height', '1.2');
    t1.setAttribute('width', '1.2');
    t1.setAttribute('depth', '0.1');
    t1.setAttribute('position', '0.05 0 0.0');
    t1.setAttribute('rotation', '0 90 0');
    tableau.appendChild(t1);

    var t2 = document.createElement('a-plane');
    t2.setAttribute('src', src);
    t2.setAttribute('height', '1');
    t2.setAttribute('width', '1');
    t2.setAttribute('position', '0.1 0 0');
    t2.setAttribute('rotation', '0 90 0');
    t2.setAttribute('id', 'image');
    t2.setAttribute('color', "#848484");
    tableau.appendChild(t2);

    scene.appendChild(tableau);
}


function Mobile(nom, cible) {
    this.id = nom;
    this.cible = cible;
}



/*
function onEnter(e){
	var primitive=e.target.parentElement.parentElement;
	primitive.setAttribute("color","yellow");
}

function onLeave(e){
	var primitive=e.target.parentElement.parentElement;
	primitive.setAttribute("color","blue");
}

function onClick(e){
	var primitive=e.target.parentElement.parentElement;
	var position=primitive.getAttribute("position");
	position.x--;
	primitive.setAttribute("position",position);
}
*/
