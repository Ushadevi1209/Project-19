var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backgr, backgrImage;

var car, carImage;

var coin, coinImage;

var drum, drumImage;

var obstacle, obstacleImage;

var black, blackImage;

var barrier, barrierImg;
var gameover, gameoverImage;
var restart, restartImage;
var score;


function preload() {

  backgrImage = loadImage("backgroun.png");

  carImage = loadImage("car.png");

  coinImage = loadImage("coin.png");

  drumImage = loadImage("drum-removebg-preview.png");

  obstacleImage = loadImage("obstacle.png");

  blackImage = loadImage("black.jpg");

  barrierImg = loadImage("WhatsApp_Image_2021-02-07_at_1.13.40_PM-removebg-preview.png");
  gameoverImage = loadImage("gameover.jpeg");
  restartImage = loadImage("restart.png");
}


function setup() {
  createCanvas(400, 500);

  backgr = createSprite(200, 200, 100, 100);
  backgr.addImage(backgrImage);
  backgr.scale = 1.0;
  backgr.velocityY = 3;


  car = createSprite(200, 350, 100, 100);
  car.addImage(carImage);
  car.scale = 0.15;
  car.setCollider("rectangle", 0, 0);
  car.debug = false;

  black = createSprite(200, 200, 100, 100);
  black.addImage(blackImage);

  gameover = createSprite(200, 230, 30, 20);
  gameover.addImage(gameoverImage);
  gameover.scale = 0.9;

  restart = createSprite(200,280,20,10);
  restart.addImage(restartImage);
  restart.scale = 0.8;
  drumGroup = new Group();
  obstacleGroup = new Group();
  coinGroup = new Group();
  barrierGroup = new Group();
  score = 0;
}


function draw() {
  background(0);

  border1 = createSprite(0, 40, 140, 1000)
  car.bounceOff(border1);
  border1.visible = false;
  border2 = createSprite(380, 40, 100, 1000)
  car.bounceOff(border2);
  border2.visible = false;
  if (gameState === PLAY) {

    gameover.visible = false;
    restart.visible = false;
    if (backgr.y > 300) {
      backgr.y = 260;
    }
    backgr.velocityY = (4 + (score / 2));
    black.visible = false;

    if (keyDown("left_Arrow")) {
      car.x = car.x - 8
    }

    if (keyDown("right_Arrow")) {
      car.x = car.x + 8
    }

    if (coinGroup.isTouching(car)) {
      score = score + 1
      coinGroup.destroyEach();
    }

    if (drumGroup.isTouching(car)||(obstacleGroup.isTouching(car))||(barrierGroup.isTouching(car))) {
      gameState=END;
      }
  }
  gameover.visible=false;
  restart.visible=false;
    
    if(gameState===END){
      black.visible = true;
     backgr.velocityY=0;
      drumGroup.velocityY=0;
      obstacleGroup.velocityY=0;
      barrierGroup.velocity = 0;
      coinGroup.velocityY=0;
    drumGroup.destroyEach(frameCount % 0 === 0);
    obstacleGroup.destroyEach(frameCount % 0 === 0);
    barrierGroup.destroyEach(frameCount % 0 === 0); 
    coinGroup.destroyEach(frameCount % 0 === 0);
    car.visible=false;
    gameover.visible=true;
    restart.visible=true;
      
      if(mousePressedOver(restart)) {
      reset();
    }
}
 
    

    spwanDrum();
    spwanObstacle();
    spwanCoin();
    spawnBarrier();
    drawSprites();

    stroke("black");
    textSize(20);
    fill("white");
    text("Score : " + score, 50, 50);
}

function reset(){
  gameState=PLAY;
  gameover.visible=false;
  restart.visible=false;
  car.visible=true;
  score=0;
  
}



function spwanCoin() {

  if (frameCount % 200===0) {
    coin = createSprite(380, 200, 100, 100);
    coin.addImage(coinImage);
    coin.velocityY = 3;
    coin.x = Math.round(random(100, 400));
    coin.scale = 0.09;
    coin.lifetime = 200;
    coinGroup.add(coin);
    coin.velocityY = (4 + (score / 2));
    coin.setCollider("circle", 0, 0);
    coin.debug = false;
  }
}


function spwanDrum() {

  if (frameCount % 180===0) {
    drum = createSprite(400, 150, 100, 100);
    drum.addImage(drumImage);
    drum.velocityY = 3;
    drum.x = Math.round(random(100, 400));
    drum.scale = 0.30;
    drum.lifetime = 300;
    drumGroup.add(drum);
    drum.setCollider("rectangle", 0, 0);
    drum.debug = false;
  }
}

function spwanObstacle() {

  if (frameCount % 200 === 0) {
    obstacle = createSprite(400, 100, 100, 100);
    obstacle.addImage(obstacleImage);
    obstacle.velocityY = 3;
    obstacle.x = Math.round(random(100, 400));
    obstacle.scale = 0.15;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("circle", 0, 0);
    obstacle.debug = false;
  }
}

function spawnBarrier() {
  if (frameCount % 250===0) {
    barrier = createSprite(400, 100, 100, 100);
    barrier.addImage(barrierImg);
    barrier.velocityY = 3;
    barrier.x = Math.round(random(100, 350));
    barrier.scale = 0.16;
    barrier.lifetime = 300
    barrierGroup.add(barrier);
    barrier.setCollider("rectangle", 0, 0);
    barrier.debug = false;
  }
}