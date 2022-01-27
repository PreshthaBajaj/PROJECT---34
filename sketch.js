
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var tree, treeImg, ground, mango1, mango2, mango3, mango4, mango5, mango6, mango7, player, playerImg, hand, stones = [], noOfStones = 10;
var engine, world;
var mangos = [mango1, mango2, mango3, mango4, mango5, mango6, mango7];

function preload(){
  
  treeImg = loadImage("tree.png");
  playerImg = loadImage("player.png");


}

function setup() {
  createCanvas(800,700);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);


  mango1 = new Mango(260, 170, 60, 60);
  mango2 = new Mango(300, 220, 60, 60);
  mango3 = new Mango(220, 270, 60, 60);
  mango4 = new Mango(350, 270, 60, 60);
  mango5 = new Mango(300, 330, 60, 60);
  mango6 = new Mango(220, 380, 60, 60);
  mango7 = new Mango(390, 380, 60, 60);


  var options = {
    isStatic: true
  };

  tree = Bodies.rectangle(100, 120, 400, 600, options);
  World.add(world, tree);

  player = Bodies.rectangle(570, 300, 90, 370, options);
  World.add(world, player);


  ground = new Ground(400, 670, 800, 20);

  hand = new Playerhand(550, 400, 30, 80);


}


function draw() 
{
  background(51);
  Engine.update(engine);

  image(treeImg,tree.position.x,tree.position.y,400,600);
  image(playerImg,player.position.x,player.position.y,90,370);



  mango1.display();
  mango2.display();
  mango3.display();
  mango4.display();
  mango5.display();
  mango6.display();
  mango7.display();


  ground.show();
  hand.display();




  for (var i = 0; i < stones.length; i++) {
    if (stones[i] !== undefined) {
      stones[i].display();

      distance1 = dist(stones[i].body.position.x,stones[i].body.position.y, mango1.body.position.x,mango1.body.position.y)
      if(distance1<=100)
      {
        console.log("collision");
      }

      var mango1Col = Matter.SAT.collides(
        mango1.body,
        stones[i].body
      );

      var mango2Col = Matter.SAT.collides(
        mango2.body,
        stones[i].body
      );

      var mango3Col = Matter.SAT.collides(
        mango3.body,
        stones[i].body
      );

      var mango4Col = Matter.SAT.collides(
        mango4.body,
        stones[i].body
      );

      var mango5Col = Matter.SAT.collides(
        mango5.body,
        stones[i].body
      );

      var mango6Col = Matter.SAT.collides(
        mango6.body,
        stones[i].body
      );

      var mango7Col = Matter.SAT.collides(
        mango7.body,
        stones[i].body
      );

      if (mango1Col.collided ) {
        Matter.Body.setStatic(mango1.body, false);
      }
      
        else if (mango2Col.collided){
          Matter.Body.setStatic(mango2.body, false);
        }
        
        else if (mango3Col.collided){
          Matter.Body.setStatic(mango3.body, false);
        }

        else if (mango4Col.collided){
          Matter.Body.setStatic(mango4.body, false);
        }

        else if (mango5Col.collided){
          Matter.Body.setStatic(mango5.body, false);
        }
        
        else if (mango6Col.collided){
          Matter.Body.setStatic(mango6.body, false);
        }
        
        else{
          Matter.Body.setStatic(mango7.body, false);
        }
        







    

      

    }
  }



  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining Stones : " + noOfStones, 200, 100);

  if (noOfStones == 0) {
    console.log("arrow bucket is empty")
  }
  
  drawSprites();
}

function keyPressed() {
  if (keyCode === 32) {
    if (noOfStones > 0) {
      var positionX = hand.body.position.x;
      var positionY = hand.body.position.y;
      var angle = hand.body.angle;

      var stone = new Stone(positionX, positionY, 20, 20, angle);

      stone.trajectory = [];
      Matter.Body.setAngle(stone.body, angle);
      stones.push(stone);
      noOfStones -= 1;
    }
  }
}


function keyReleased() {
  if (keyCode === 32) {
    if (stones.length) {
      var angle = hand.body.angle;
      stones[stones.length - 1].shoot(angle);
    }
  }
}
