class State 
{
	enter()
    {
        alert("I'm in the Big boss of state");

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
	enter(fsm)
    {
        alert("I'm in the waiting state");
        this.interval = setInterval(this.execute,50);
	}

	execute(fsm)
    {
        
		guide = fsm.Acteur;

		if (guide.isHere() ){
			alert("Changing state from waiting to seekVisitor");
			//fsm.ChangeState(seekVisitor);
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