class Automate
{
    // Architecture de l'automate qui va servir au pingouin
    constructor(acteur)
    {
        this.Acteur = acteur;
        this.CurrentState = new Waiting();
        this.CurrentState.Enter();

    }

    // Ce qui va faire évoluer l'état de l'automate 
    Execute(Acteur)
    {

    }
    // Ce qui va changer l'état de l'automate
    ChangeState(NewState)
    {

    }
}


class Guide
{
    constructor(id)
    {
        this.id = id;
    }

    Launch()
    {
        console.log("Instantiation")

         // Instanciation du pingouin
        var scene = document.querySelector('a-scene');

        var panda = document.createElement('a-obj-model');

        panda.setAttribute("id", this.id);

        panda.setAttribute('position', this.position);
        panda.setAttribute('rotation', this.rotate);
        panda.setAttribute('scale', this.scale);

        panda.setAttribute('src', "modeles/penguin/penguin.obj");
        panda.setAttribute('mtl', "modeles/penguin/penguin.mtl");
        panda.setAttribute('position', "-5 0 0")
        panda.setAttribute('scale', "2 2 2")
        panda.setAttribute('rotation', "-90 0 0")

        // Gestion du clic
        panda.addEventListener('click', onGuideClick);

        scene.appendChild(panda);




        // On le lance
        var automate = new Automate(this);
        setInterval(automate.Execute());
    }

    
};

function onGuideClick(e)
{
    alert("QUOI ? ");
}

// Initialisation de la scène
//    constructor(id, sourceObj, sourceMtl,  position, scale, rotation)
//console.log("njfid");

//var panda = new Guide("panda", "modeles/panda/panda.obj","modeles/panda/panda.mtl", "0 0 0", "2 2 2", "0 0 0");
var panda = new Guide("panda");
document.addEventListener("DOMContentLoaded", panda.Launch, false);
