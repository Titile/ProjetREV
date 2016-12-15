document.addEventListener("DOMContentLoaded", init, false);

class Automate
{
    // Architecture de l'automate qui va servir au pingouin
    constructor(acteur, currentState)
    {
        this.Acteur = acteur;
        this.CurrentState = currentState;
        this.CurrentState.enter();
        this.PreviousState = null;
    }

    // Ce qui va faire évoluer l'état de l'automate 
    Execute(Acteur)
    {
        this.CurrentState.execute();
    }
    // Ce qui va changer l'état de l'automate
    ChangeState(NewState)
    {
        this.PreviousState = this.CurrentState;
        this.CurrentState.exit();
        this.CurrentState = NewState;
        this.CurrentState.enter();
    }

    RevertToPreviousState()
    {
        this.ChangeState(self.PreviousState);
    }
}

class State 
{
	enter()
    {
		console.log("enter function");
	}

	execute()
    {
		console.log("execute function");
	}

	exit()
    {
		console.log("exit function");
	}
}

class Waiting extends State 
{
	enter()
    {
		alert("Waiting");
        targetReached = setInterval(this.execute,50);
	}

	execute()
    {     
		var acteur = fsm.Acteur;

		if (acteur.userIsHere()){
			console.log("Changing state from waiting to seekVisitor");
			fsm.ChangeState(seekVisitor);
		}

		else{
			console.log("lalalala je ne vois personne en Harley Davidson");
		}

	}

	exit(){
		alert("Stop Waiting");
		clearInterval(targetReached);

		console.log("exit function");
	}		
}

class SeekVisitor extends State 
{
	enter()
	{
        targetReached = setInterval(this.execute,50);
	}

	execute()
	{
		var positionReached = guide.MoveToVisitor();
		if(positionReached)
		{
			fsm.ChangeState(speak);
		}		
	}

	exit(){
		//clearInterval(this.interval);
		//alert("je quitte le seek")
		clearInterval(targetReached);

		console.log("exit function");
	}		
}

class Speak extends State 
{
	enter(){
		this.execute();
		alert("Enter speak");
		console.log("enter function");
	}

	execute(){
		alert('Bonjour et bienvenu dans cette partie du musée. Si vous voulez bien me suivre ? ');

	}

	exit(){
		alert("exit speak");

		console.log("exit function");
	}		
}

class Lead extends State 
{
	enter(){
		console.log("enter function");
	}

	execute(){
		console.log("execute function");
	}

	exit(){
		console.log("exit function");
	}		
}

// Définition états 
var waiting = new Waiting();
var speak = new Speak();
var seekVisitor = new SeekVisitor();
var lead = new Lead();

var guide; 
var fsm;
var targetReached;

function init()
{
	guide = new Guide("guide");
	fsm = new Automate(guide, waiting);
}