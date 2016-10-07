
function Mobile(nom,nomCible,x0,y0,z0,cap){
  this.nom = nom ; 
  this.nomCible = nomCible ; 
  
  var el = document.getElementById(nomCible) ;
  alert("L élément du DOM :" + nomCible + el) ; 
  this.position = {"x": x0, "y":y0, "z":z0} ; 
  this.rotation = {"x": 0.0, "y": 0.0, "z":0.0} ; 
  this.vitesse  = {"x": 0.5, "y": 0.0, "z":0.0} ;  
  this.velocite    = 0.0 ; 
  this.angleRadian = cap ; 
  var p = el.getAttribute("position") ; 
  p.x = position["x"] ; 
  p.y = position["y"] ; 
  p.z = position["z"] ; 
  el.setAttribute("position",p) ; 
  
} ; 

Mobile.prototype.avancer = function(dt){
  var el =  document.getElementById(nomCible) ;
  var p = el.getAttribute("position") ; 
  p.x += this.vitesse["x"]*dt ; 
  p.y += this.vitesse["y"]*dt ;
  p.z += this.vitesse["z"]*dt ;
  el.setAttribute("position",p) ;  
}





	
	
