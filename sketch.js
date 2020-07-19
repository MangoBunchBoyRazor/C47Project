const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var player, ammo;
//var zoom;
function preload() {

}

function setup() {
	createCanvas(800, 700);

	engine = Engine.create();
	world = engine.world;
	world.gravity.y = 0;

	player = new Player(width / 2, height / 2);
	ammo = [];
	for (let i = 0; i < 200; i++) {
		let s = new Ammo(floor(random(-width, width)), floor(random(-height, height)));
		ammo.push(s);
	}

	//zoom = 1;
}


function draw() {
	rectMode(CENTER);
	background(240);

	/*translate(width / 2, height / 2);
	let newzoom = 64 / (player.sprite.width / 2);
	zoom = lerp(zoom, newzoom, 0.1);
	scale(zoom);
	translate(-player.sprite.position.x, -player.sprite.position.y);*/

	player.update();

	for (let i = 0; i < ammo.length; i++) {
		let s = ammo[i];
		s.update();
	}

	drawSprites();
}