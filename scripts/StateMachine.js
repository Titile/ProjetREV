class Automate
{
    // Architecture de l'automate qui va servir au pingouin
    constructor(acteur, currentState)
    {
		alert("automate created");
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
        alert("I'm in the waiting state");
        this.interval = setInterval(this.execute,50);
	}

	execute()
    {     
		var acteur = fsm.Acteur;

		if (acteur.isHere()){
			alert("Changing state from waiting to seekVisitor");
			fsm.ChangeState(seekVisitor);
		}

		else{
            clearInterval(this.interval);
			console.log("lalalala je ne vois personne en Harley Davidson");
		}

	}

	exit(){
        alert("exit the waiting state");
		console.log("exit function");
	}		
}

class SeekVisitor extends State 
{
	enter(fsm){
        alert("I'm in seek visdiobnoifseeg,x");

		console.log("enter function");
	}

	execute(){
		console.log("execute function");
	}

	exit(){
		console.log("exit function");
	}		
}

class Speak extends State 
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

var waiting = new Waiting();
var speak = new Speak();
var seekVisitor = new SeekVisitor();
var lead = new Lead();

var guide = new Guide("guide");
var fsm = new Automate(guide, waiting);