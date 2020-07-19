/*
	Killer mode on
	Game source code
	Created by Mohamed Razeen
*/
var player, ammo;	//Declaring variables

function preload() { /**/ }
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

	player.update();	//updating the player object

	//Updating all the elements in the ammo array
	for (let i = 0; i < ammo.length; i++)
		ammo[i].eats();	//Checking if the player is colliding with any blob

	//Drawing all sprites
	drawSprites();
}