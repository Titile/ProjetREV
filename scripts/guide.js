document.addEventListener("DOMContentLoaded", init, false);

var pigou ={};
var cameraReached;

function init()
{


    pigou = new Guide("panda", 4.0,0.0,0.0);
    console.log(guide);

    //guide.addEventListener('click', onClick);
}

function onClick(e)
{
    pigou.getVisitorDistance();
    //pigou.MoveToCamera();
    cameraReached = setInterval(function(){
      pigou.MoveToCamera(pigou);
    }, 50);
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

    /*getPigouPosition(){
      return {this.position.x,this.positions.y,this.position.z};
    }*/

    Execute(acteur)
    {

    }

    MoveToCamera(pigou){


      var cameraPosition = pigou.getCameraPosition();
      var pigouPos = pigou.position;

      if (pigouPos.x > cameraPosition.x + 0.5)
      {
          pigouPos.x-=0.1;
      }
      else if(pigouPos.x < cameraPosition.x - 0.5)
      {
          pigouPos.x += 0.1;
      }
      else
      {
          pigouPos.x = cameraPosition.x;
      }
      // Gestion de la position en Z
      if (pigouPos.z > cameraPosition.z + 0.5)
      {
          pigouPos.z -= 0.1;
      }
      else if(pigouPos.z < cameraPosition.z - 0.5)
      {
          pigouPos.z += 0.1;
      }
      else
      {
          pigouPos.z = cameraPosition.z;
      }


      pigou.setPosition(pigouPos.x, pigouPos.y, pigouPos.z);

      // Test pour savoir si la camera a atteint la position
      if (Math.abs(cameraPosition.x - pigou.position.x)<2 && Math.abs(cameraPosition.z - pigou.position.z)<2)
      {
          clearInterval(cameraReached);
      }
      /*var a = (this.position.z - cameraPosition.z)/(this.position.x - cameraPosition.x);
      var b = cameraPosition.z-a*cameraPosition.x;
      console.log("a: " + a);
      console.log("b: " + b);
      console.log("pigou x: " + this.position.x);
      var moveX = this.position.x+0.5;
      var moveZ = a*(this.position.x+0.5);
      console.log("move x: "+ moveX);
      console.log("move z: " + moveZ);
      this.setPosition(this.position.x+0.5, this.position.y, a*(this.position.x+0.5));*/
    }

};
