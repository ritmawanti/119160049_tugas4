let vs = []
function setup() {
  createCanvas(400, 400);
  v = new Vehicle(200,200);
  j=0
}

function draw() {
  background(224,215,255);
  
  v.display()
  v.edges()
  v.update();
  v.wander();
  
  

  
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(1,0);
    this.acceleration = createVector(0,0);
    this.l = 20.0;
    this.maxspeed = 2;
    this.maxforce = 0.1;
    this.wanderTheta = 0;
  }
  
  wander(){
    //let steeringforce = p5.Vector.random2D()
    //steeringforce.setMag(0.1)
    //this.applyForce(steeringforce)
    
 
  
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location)
    let wanderRadius = 50;
    noFill()
    stroke(255)
    let theta = this.wanderTheta  + this.velocity.heading();
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));
    
    let debug = true 
    if (debug){
      push()  
      line( this.location.x, this.location.y, projPoint.x, projPoint.y);
      noStroke()
      fill(250,255,199)
      circle (projPoint.x, projPoint.y, 8)
      noFill()
      stroke ("yellow")
      circle (projPoint.x, projPoint.y, wanderRadius*2)
      circle(wanderPoint.x, wanderPoint.y, wanderRadius)
      
      line (this.location.x, this.location.y, wanderPoint.x, wanderPoint.y);
      fill("red")
      circle(wanderPoint.x, wanderPoint.y, 16)
      
      
      pop()
    }
    
    let steeringforce = wanderPoint.sub(this.location);
    steeringforce.setMag(this.maxforce)
    this.applyForce(steeringforce)
    
    this.wanderTheta += random(-0.5, 0.5);
    //this.wanderTheta = this.wanderTheta + random (-0.5, 0.5)
    
    
    }
  
  seek(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }

    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    fill(175);
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta)
    triangle(50, 120, 110, 120, 60, 95) 
  rect(50, 120, 60, 30)
    triangle (75, 80, 77, 60, 80,80)

  fill(248, 0, 71)
  ellipse(65, 100, 15 , 15)
  fill(245,222,179)
  rect(50, 125, 60, 20)
  
  fill(255,182,193)
  arc(55, 125, 10, 10, radians (0), radians(180))
  arc(65, 125, 10, 10, radians (0), radians(180))
  arc(75, 125, 10, 10, radians (0), radians(180))
  arc(85, 125, 10, 10, radians (0), radians(180))
  arc(95, 125, 10, 10, radians (0), radians(180))
  arc(105, 125, 10, 10, radians (0), radians(180))
 
  
  fill(243,234,219)
  arc(60,92, 15, 15, radians(180), radians(0))
  
  fill(255,248,220)

  rect(75, 80, 5, 30)
    var y = 50+ 20*Math.sin(j/100);
  j+=5;
  triangle (280, 80, 277, y, 275,80)
      fill(255,204,225)
  ellipse(110,0, 180,120 )
  
    

  triangle(0, this.l/2, 0, -this.l/2, this.l,0)
  pop()
  }
  
  
  
  

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }

}

