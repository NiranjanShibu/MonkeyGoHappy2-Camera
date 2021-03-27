
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var ground;
var mybackground, backgroundImage;
var camP, camP2, camP3, spawnX;

function preload(){
  
  
  monkey_running = loadAnimation("sprites/Monkey_01.png","sprites/Monkey_02.png","sprites/Monkey_03.png","sprites/Monkey_04.png","sprites/Monkey_05.png","sprites/Monkey_06.png","sprites/Monkey_07.png","sprites/Monkey_08.png","sprites/Monkey_09.png", "sprites/Monkey_10.png");
  
  bananaImage = loadImage("sprites/banana.png");
  obstacleImage = loadImage("sprites/stone.png");
  backgroundImage = loadImage("sprites/jungle.jpg");
 
}



function setup() {
  createCanvas(600, 355);

  mybackground = createSprite(300, 170);
  mybackground.addImage(backgroundImage);

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("run", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 1200, 35);
  ground.velocityX = 1;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
} 


function draw() {
  
  background("green");

  camera.position.x +=1; 
  
  if(keyDown("space") || keyDown("w") || keyDown(UP_ARROW)){
     
    if(monkey.y > 300){
      monkey.velocityY = -11;
    }

  }
  if(keyDown(RIGHT_ARROW) || keyDown("d")){
   
    if(monkey.y > 295){
      monkey.x += 5;
    }

  }

  camP = camera.position.x;
  camP2 = camP - 320;
  camP3 = camP + 320;

  if(monkey.x < camP2 || monkey.x > camP3){
    location.reload();
    console.log("refresh page");
  }
  
  monkey.velocityY = monkey.velocityY + 0.4;
  
  monkey.collide(ground);
    
if (mybackground.x < camP3 && frameCount % 200 === 0) {
  mybackground.x = camera.position.x;
}
  
  rock();
  food();
  drawSprites();

  textSize(15);
  fill("yellow");
  text("Score: "+ score, camP-10,50);

}

function food(){

  spawnX = camP + 335;
  
  if (frameCount % 80 === 0) {
    banana = createSprite(spawnX,50,20,20);
    banana.y = Math.round(random(175, 235));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.lifetime = 210;
    
    bananaGroup.add(banana);
  }
  
  if(monkey.isTouching(bananaGroup)){
     score = score+50;
    bananaGroup.destroyEach();
     }
  
}

function rock(){
  
  if (frameCount % 300 === 0) {
    obstacle = createSprite(spawnX,334.5,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.08;
    obstacle.velocityX = -3;
    obstacle.lifetime = 210;
    
    obstacleGroup.add(obstacle);
  }
  
  if(monkey.isTouching(obstacleGroup)){
     score = score-100;
    obstacleGroup.destroyEach();
     }
  
}






