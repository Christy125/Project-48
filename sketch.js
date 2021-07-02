var backImage,backgr;
var player,llamaImage
var ground, ground_img;

var HealthyGroup,appleImage;
var UnhealthyGroup, cakeImage;

var gameOver;
var score=0;

function preload()
{
	backImage=loadImage("background.jpg");
	llamaImage=loadImage("llama.png");
	appleImage=loadImage("apple.png");
	cakeImage=loadImage("cake.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	backgr=createSprite(0,0,800,400);
	backgr.addImage(backImage);
	backgr.scale=1.5;
	backgr.x=backgr.width/2;
	backgr.velocityX=-4;

	player=createSprite(50,height-70,20,50);
	player.addImage(llamaImage);
	player.scale=0.1;

	ground=createSprite(width/2,height-10,width,125);
	ground.velocityX=-4;
	ground.x=ground.width/2;
	ground.visible=false;

	HealthyGroup=new Group();
	UnhealthyGroup=new Group();

	score=0;
}


function draw() {
  
  background(255);
  
  if(ground.x<0){
	  ground.x=ground.width/2;
  }
  if(backgr.x<100){
	  backgr.x=backgr.width/2;
  }

  if(HealthyGroup.isTouching(player)){
	  HealthyGroup.destroyEach();
	  score=score+2;
  }
  switch(score){
	  case 10: player.scale=0.12;
	  break;
	  case 20: player.scale=0.14;
	  break;
	  case 30: player.scale=0.16;
	  break;
	  case 40: player.scale=0.18;
	  break;
	  default: break;
  }
  if(touches.length >0||keyDown("space")){
	  player.velocityY=-12;
	  touches = [];
  }
  player.velocityY=player.velocityY+0.8;

  player.collide(ground);
  spawnHealthy();
  spawnUnhealthy();

  if(UnhealthyGroup.isTouching(player)){
	UnhealthyGroup.destroyEach();
	player.scale=0.08;
	score=score-2;
}

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+score,500,50);
}

function spawnHealthy(){
	if(frameCount % 80 === 0){
		var apple=createSprite(600,250,40,10);
		apple.y = random(120,200);
		apple.addImage(appleImage);
		apple.scale=0.05;
		apple.velocityX=-5;
		apple.lifetime=300;
		player.depth=banana.depth+1;

		HealthyGroup.add(apple);
	}
}

function spawnUnhealthy(){
	if(frameCount % 100 === 0){
		var cake=createSprite(550,250,10,40);
		cake.y = random(120,200);
		cake.addImage(cakeImage);
		cake.scale=0.05;
		cake.velocityX=-6;
		cake.lifetime=300;

		UnhealthyGroup.add(cake);
	}
}



