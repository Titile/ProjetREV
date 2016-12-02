document.addEventListener("DOMContentLoaded", init, false);

var pigou ={};

function init()
{


    pigou = new Guide("panda", 4.0,0.0,0.0);
    console.log(guide);

    //guide.addEventListener('click', onClick);
}

function onClick(e)
{
    console.log(document.getElementById("camera").getAttribute("position"));
    console.log(e);
    console.log(pigou);
    pigou.getVisitorDistance();
    //document.getElementById("panda").getVisitorDistance();
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

        guide.addEventListener('click',onClick);

        this.scene.appendChild(guide);
    }

    getVisitorDistance(){
        console.log("coucou");
        var cameraPosition = document.getElementById("camera").getAttribute("position")
        var distance = Math.sqrt((this.position.x - cameraPosition.x)*(this.position.x - cameraPosition.x)+(this.position.z - cameraPosition.z)*(this.position.z - cameraPosition.z));
        console.log("distance pigou camera: " + distance );
    }

    Execute(acteur)
    {

    }

};
