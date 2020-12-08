//Create variables here
var dog, dog1, dog2, database, foodS, foodStock;


function preload()
{
  //load images here
  dog1 = loadImage("images/dogimg.png");
  dog2 = loadImage("images/dogimg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = createSprite(250,300,150,150);
  dog.addImage(dog1);
  dog.scale = 0.15;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
 background("green");
 if(keyWentDown(UP_ARROW)) {
   writeStock(foodS);
   dog.addImage(dog2);
 }
  drawSprites();
  fill(rgb(0,255,250));
  stroke("red");
  strokeWeight(3);
  textSize(20);
  text("Food Remaining :",+foodS,170,200);
  textSize(15);
  text("Note: Press Up Arrow Key to Feed Joe",130,20);

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
 if(x<=0) {
    x = 0;
   }
 else {
    x = x-1;
   }

 database.ref('/').update({
    Food:x
   })
}



