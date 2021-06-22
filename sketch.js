var bgImage;
var rocketImage,rocket
var asteroidsImage,asteroidsImage2,asteroidsImage3
var laserImage;
var blastImage;
var bulletsound;
var rockGroup,laserGroup
var gameOver;
var score=0;
var count=0;
var welcomeBg;
var gameOverImg;
var laserSound

var gameState = "start";
function preload(){
     bgImage=loadImage("1.jpg")
     rocketImage=loadImage("rocket.png")
     asteroidsImage=loadImage("asteroids.png")
asteroidsImage2=loadImage("blue comet.png")
asteroidsImage3=loadImage("fire meteor.png")
laserImage=loadImage("laser.png")
blastImage=loadImage("blast.png")
welcomeBg=loadImage("bgIntro.jpg")
gameOverImg=loadImage("gameover.jpg")
laserSound=loadSound("laser.wav")
}

function setup(){
    createCanvas(displayWidth+330,displayHeight);
rocket=createSprite(300,displayHeight-100)
rocket.addImage(rocketImage)

rocket.scale=0.5
rockGroup=new Group();
laserGroup=new Group();


}

function draw(){
    background(bgImage);
    if(gameState==="start"){
        background(welcomeBg);
        rocket.visible=false
textSize(60);
fill("white");
stroke("green")
strokeWeight(5)
text(" ROCKET SHOOTING GAME",displayWidth/2-200,100);
textSize(40);
stroke("darkblue")
strokeWeight(5)
text("INSTRUCTIONS",displayWidth/2 - 50,255);
textSize(40);
stroke("yellow")
strokeWeight(3)
text("PRESS SPACE KEY TWICE TO SHOOT THE ASTEROIDS",displayWidth/2-300,400);

text("BUT IF YOU MISS 5 ASTEROIDS YOU LOSE THE GAME",displayWidth/2-300,500)
text("PRESS SPACE TO START THE GAME",displayWidth/2-300,600)
if(keyDown("space")){
    gameState = "play";
}
    }
   
if(gameState==="play"){
    rocket.visible=true
    rocket.x=mouseX;
    rocket.y=displayHeight-100
    fill("white");
    textSize(40);
    text("score: "+score,50,50)
    text("escaped Asteroids:" +count,displayWidth-50,50);
    if (keyDown("space")){
        laserSound.play();
spawnlaser();
    }

spawnAsteroids();

for(var i=0;i<rockGroup.length;i++){   
if(rockGroup.get(i).y > displayHeight){
    rockGroup.get(i).destroy();
    count = count + 1
}
}


if(count >= 5){
    gameState= "end";
}



for(var i=0;i<rockGroup.length;i++){  

if (rockGroup.get(i).isTouching(laserGroup)){
rockGroup.get(i).addImage(blastImage);
 

if(rockGroup.get(i).y > displayHeight/2){
    rockGroup.get(i).destroy();
}

if(count>0){
    count=count-1
}else if(count===0){
    count=0
}

laserGroup.destroyEach();
score=score+1
}
}
}


if(gameState==="end"){
    
    background(gameOverImg);
    rocket.visible=false
    
    rocket.x = displayWidth/2;
    rocket.y = displayHeight/2;
    rockGroup.destroyEach();
laserGroup.destroyEach();
score = 0;
count = 0;
    
    if(keyDown("space")){
        gameState = "start";
    }
}


    drawSprites();

}
function spawnAsteroids(){
    if (frameCount%100===0){
        var asteroids=createSprite(20,0);
        asteroids.x=Math.round(random(50,displayWidth-50))
        asteroids.velocityY=2;
        var r=Math.round(random(1,3));
        if (r===1){

        
        asteroids.addImage(asteroidsImage)
        asteroids.scale=0.3
        }
        else if (r===2){
            asteroids.addImage(asteroidsImage2)
asteroids.scale=0.7
           
        }
        else{
            asteroids.addImage(asteroidsImage3)
            asteroids.scale=0.9
        }
        rockGroup.add(asteroids)
      
        
    }

}
function spawnlaser(){
    laser=createSprite(300,300)
    laser.x=rocket.x;
    laser.y=rocket.y
    laser.velocityY=-5
    laserGroup.add(laser)
    laser.addImage(laserImage)
    
}