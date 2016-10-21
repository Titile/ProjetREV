class State {

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

class Waiting extends State {
	enter(){
		console.log("I'm waiting for a visitor");
	}

	execute(fsm){
		guide = fsm.guide;

		if (guide.getVisitorDistance < 5){
			console.log("Changing state from waiting to seekVisitor");
			fsm.changeState(SeekVisitor);
		}

		else{
			console.log("lalalala je ne vois rien");
		}

	}

	exit(){
		console.log("exit function");
	}		
}

class SeekVisitor extends State {
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

class Speak extends State {
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

class Lead extends State {
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
	
