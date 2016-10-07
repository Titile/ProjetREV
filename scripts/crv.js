document.addEventListener("DOMContentLoaded", init, false);

var scene = document.querySelector('a-scene');
var acteurs = {};

function init() {
    alert("CRV");
    //var scene = document.querySelector('a-scene');
    alert("Scene " + scene);
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
