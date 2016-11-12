document.addEventListener("DOMContentLoaded", init, false);


function init()
{


    guide = new Guide("panda", 4.0,0.0,0.0);

    //guide.addEventListener('click', onClick);
	document.getElementById("panda").addEventListener('click',onClick);



}

function onClick()
{
    alert("je me suis fais clicker");
}


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

        this.scene.appendChild(guide);
    }

    getVisitorDistance(){
        console.log(document.getElementById("camera").getAttribute("position"));
    }

    Execute(acteur)
    {

    }

};

function clickGuide(){
    console.log(document.getElementById("camera").getAttribute("position"));
}



