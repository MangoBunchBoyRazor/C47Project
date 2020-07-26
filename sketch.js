/*
	Killer mode on
	Game source code
	Created by Mohamed Razeen
*/
var player, ammo, form, database;	//Declaring variables
var zoom = 2;

var font;

var canvas;
var playerCount, players;
var gameState;
function preload() { 
	font = loadFont('font2.ttf');

	database = firebase.database();
	Form.registerEventListeners();
}
function setup() {
	gameState = "waiting";

	canvas = createCanvas(800, 700);	//Creating the canvas
	canvas.style('z-index','-1');

	form = new Form();

	ammo = [];	//Array for storing all the ammo objects
	//Initializing the array
	for (let i = 0; i < 200; i++) {
		let s = new Ammo(floor(random(-width, width)), floor(random(-height, height)));
		ammo.push(s);
	}
}
//Animation loop
function draw() {
	clear();
	if(gameState == "play"){
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

	for(var plr in players){
		if(plr !== player.name){
			let enemy = players[plr];
			let pos = enemy.position;

			push();
			ellipse(pos.x,pos.y,enemy.size,enemy.size);
			translate(pos.x,pos.y);
			textSize(players[plr].size/4);
			textAlign(CENTER);
			fill(0);
			text(enemy.name,0,0);

			//health
			stroke(0);
			strokeWeight(4);
			noFill();
			rectMode(CENTER);
			rect(0,enemy.size/2,100*(enemy.size/64),25);
			noStroke();
			fill(0,255,0);
			rect(0,enemy.size/2,enemy.health*(enemy.size/64),25);

			//bullets
			noStroke();
			fill(0,0,255);
			if(enemy.bullets !== undefined){
				for(let b = enemy.bullets.length-1; b >= 0; b--){
					let g = enemy.bullets[b];
					translate(-enemy.position.x,-enemy.position.y);
					ellipse(g.x,g.y,10,10);
					let d = dist(g.x,g.y,player.sprite.position.x,player.sprite.position.y);
					if(d < 10 + player.radius/2)
						player.health--;
				}
				if(player.health <= 0){
					player.removeFromGame();
				}
			}
			pop();
		}
	}

	translate(player.sprite.position.x,player.sprite.position.y);
	textSize(18);
	textFont(font);
	scale(1/zoom);
	text("Ammo count: "+player.ammoCount,-width/2+10,-height/2+40);
	text("Controls: W+A+S+D",width/2-250,-height/2+40);
	text("Space to shoot",width/2-200,-height/2+80);
	text("health: "+player.health,-width/2+10,-height/2+80);

	//Displaying the name
	push();
	textSize(player.radius/4);
	colorMode(HSB);
	fill(player.hue,100,70);
	//translate(player.sprite.position.x,player.sprite.position.y);
	textAlign(CENTER);
	text(player.name,0,5);
	pop();

	//health
	stroke(0);
	strokeWeight(4);
	noFill();
	rectMode(CENTER);
	rect(0,player.radius/2,100*(player.radius/64),25);
	noStroke();
	fill(0,255,0);
	rect(0,player.radius/2,player.health*(player.radius/64),25);
	} else if(gameState == "over"){
		background(240);
		fill(100);
		textAlign(CENTER);
		textFont(font);
		if(player.kills > 10){
			text("That was one for the books!",10,20);
		} else if(player.kills > 5){
			text("That was not bad!",10,20);
		} else if(player.kills > 0){	
			text("At least you killed!",width/2,height/2);
		} else if(player.kills == 0){
			text("Better luck next time!",width/2,height/2);
		}
	}
}

function keyPressed(){
	if(keyCode==32){
		if(player.ammoCount > 0)
			player.releaseAmmo();
		return false;
	}
}