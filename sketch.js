/*
	Killer mode on
	Game source code
	Created by Mohamed Razeen
*/
var player, ammo;	//Declaring variables
var zoom = 2;

var font;

function preload() { 
	font = loadFont('font2.ttf');
}
function setup() {
	createCanvas(800, 700);	//Creating the canvas

	player = new Player(width / 2, height / 2);	//Creating the main player object
	ammo = [];	//Array for storing all the ammo objects
	//Initializing the array
	for (let i = 0; i < 200; i++) {
		let s = new Ammo(floor(random(-width, width)), floor(random(-height, height)));
		ammo.push(s);
	}
}
//Animation loop
function draw() {
	background(240);	//Background color

	//translating to the center
	translate(width/2,height/2);
	//Lerping the zoom level to make it smooth
	let newzoom = 64/player.radius;
	zoom = lerp(zoom,newzoom,0.1);
	scale(zoom);
	//translating to the player position so that the viewport always focuses on it
	translate(-player.sprite.position.x,-player.sprite.position.y);

	angleMode(DEGREES);	//Setting the angle mode to degrees

	player.update();	//updating the player object

	//Updating all the elements in the ammo array
	for (let i = ammo.length-1; i >= 0 ; i--)
		ammo[i].eats();	//Checking if the player is colliding with any blob

	//Drawing all sprites
	drawSprites();

	translate(player.sprite.position.x,player.sprite.position.y);
	textSize(18);
	textFont(font);
	scale(1/zoom);
	text("Ammo count: "+player.ammoCount,-width/2+10,-height/2+40);
	text("Controls: W+A+S+D",width/2-250,-height/2+40);
	text("Space to shoot",width/2-200,-height/2+80);
	text("health: "+player.health,-width/2+10,-height/2+80);
}

function keyPressed(){
	if(keyCode==32){
		if(player.ammoCount > 0)
			player.releaseAmmo();
		return false;
	}
}