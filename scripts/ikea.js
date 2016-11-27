document.addEventListener("DOMContentLoaded", init, false);



function init() 
{    
    var scene = document.querySelector('a-scene');

    // A gauche de la fenetre
    tableau("t-01", "tableau/tab1.jpg", "0.5 3 2", "9 4 -4", "0 180 0");

    tableau("t-02", "tableau/tab2.jpg", "0.5 3 2", "9 4 4", "0 180 0");

    tableau("t-02", "tableau/tab3.jpg", "0.5 3 2", "2 4 -6", "0 -90 0");

    tableau("t-02", "tableau/tab4.jpg", "0.5 3 2", "-2.5 4 6", "0 90 0");

    tableau("t-02", "tableau/tab5.jpg", "0.5 1.5 2.5", "6 5 6", "0 90 0");

    tableau("t-02", "tableau/tab6.jpg", "0.5 3 4", "-10 4 0", "0 0 0");  
}




function tableau(nom, src, scale, position, rotate) 
{
    var scene = document.querySelector('a-scene');
    var tableau = document.createElement('a-entity');
    tableau.setAttribute("id", nom);
    tableau.setAttribute('position', position);
    tableau.setAttribute('scale', scale);
    tableau.setAttribute('rotation', rotate);
    

    var t1 = document.createElement('a-box');
    t1.setAttribute('color', '#844B00');
    t1.setAttribute('height', '1.2');
    t1.setAttribute('width', '1.2');
    t1.setAttribute('depth', '0.1');
    t1.setAttribute('position', '0.04 0 0.0');
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



