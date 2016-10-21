document.addEventListener("DOMContentLoaded", init, false);


function init()
{
    guide = new Guide("", 0.0,0.0,0.0);
    //guide.addEventListener("onClick", clickGuide, false);
    console.log("------------CAMERA----------");
    guide.getVisitorDistance();
}

class Guide
{
    constructor(name, posX, posY, posZ)
    {
        if(name=="")
        {
            this.name = "Panda"
        } 
        else 
            this.name = name;
        this.name = name;

        this.position = {"x": posX, "y":posY, "z":posZ};
        this.scene = document.querySelector('a-scene');
        //var guide = document.createElement('a-entity');
        
        var guide = document.createElement('a-obj-model');     

        guide.setAttribute('id', this.name);
        guide.setAttribute('position', this.position);     
       
        guide.setAttribute('src', "modeles/penguin/penguin.obj");
        guide.setAttribute('mtl', "modeles/penguin/penguin.mtl" );
        this.rotation = {"x":-90, "y":-90, "z":-90};
        guide.setAttribute('rotation', this.rotation);

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



