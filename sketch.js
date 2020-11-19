const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var particles = [];
var plinkos = [];
var divisions = [];
var divisionHeight=300;
var particle;
var score;
var turn;
var gameState;

function setup() {
  createCanvas(480,800);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(240, 796, 480, 8);
  botdivision = new Ground(240, 787, 480, 10);
 
  score = 0;
  turn = 0;
  gameState = "start";

  for (var k= 0;k<=width;k=k+80){
    divisions.push(new Division(k,height-150,10, divisionHeight))
  }
  for(var j = 40; j<=width;j = j+50){
    plinkos.push(new Plinko(j,75))
  }
  for(var j = 15; j<=width-10;j=j+50){
    plinkos.push(new Plinko(j,175))
  }
  for(var j = 40; j<=width;j = j+50){
   plinkos.push(new Plinko(j,275))
 }
 for(var j = 15; j<=width-10;j=j+50){
   plinkos.push(new Plinko(j,375))
 }


}

function draw() {
  background(0); 
  Engine.update(engine);
  fill("red");
 ground.display();
 fill("white");
 botdivision.display();

 

for(var j=0;j<plinkos.length;j++){
  plinkos[j].display();
}
for(var k=0;k<divisions.length;k++){
  divisions[k].display();
}

if(frameCount%60===0){
  particles.push(new Particle(random(width/2-30, width/2+30), 10,10));

}

for (var j = 0; j < particles.length; j++) {

  particles[j].display();
}

text("Score: "+score, 400, 50);
if (particle!=null){
    particle.display();

   if (gameState==="start"){
    if (particle.body.position.y>700){
      if (particle.body.position.x <160){
        score = score+500;
        particle = null;
        turn++;
      }
      if (particle.body.position.x >161 && particle.body.position.x<320){
        score = score+100;
        particle = null;
        turn++;
      }
      if (particle.body.position.x>321&&particle.body.position.x<480){
        score = score+200;
        particle = null;
        turn++;
      }
    }
   }

}

if (turn === 5){
  gameState = "end"
}

if (gameState==="end"){
   textSize(24);
   stroke("white");
   text("Game Over", width/2, height/2);
}
  drawSprites();
}


function mousePressed (){
 if (gameState==="start"){
   particle = new Particle(mouseX, 10,10,10);
 }
}






