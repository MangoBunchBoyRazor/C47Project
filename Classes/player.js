/*
    PC Character
    IGN Player
    This is the main character in the game
    It is controlled by the user. Controls W,A,S,D

    Main properties:
        * sprite - p5.play sprite
        * health - health of the character
        * bullets - a group of all the bullets released by the player
        * level - the level of the player
        * ammoCount - count of the ammo collected by the player
    Other properties:
        * hue - color of the player
        * radius - size of the player
    Methods:
        * updateSurfaceArea - function to increase the size of the blob
        * update - generic update function. Performs all necessary tasks such as updating position, etc
        * releaseAmmo - basically the 'shoot' function for the player
*/
class Player {
    constructor(x, y) {
        this.sprite = createSprite(x, y, 64, 64); //Creating sprite for the player
        //Drawing the player as a circle with a cannon
        this.sprite.draw = ()=>{
            push();
            colorMode(HSB);
            fill(this.hue,90,100);
            strokeWeight(4);
            stroke(this.hue,100,90);
            ellipse(0,0,this.sprite.width,this.sprite.height);
            rectMode(CORNER);
            noStroke();
            fill(0);
            rect(this.radius/6,-this.sprite.height/10,this.radius/2,this.sprite.height/5);
            pop();
        }
        this.sprite.setCollider("circle");  //Circle collider
        this.sprite.friction = 0.05;    //Friction

        this.health = 100;  //health of the player
        this.bullets = createGroup();   //Bullets of the player
        this.level; //level of the player
        this.hue = floor(random(360));  //Color of the player
        this.radius = 64;   //Size of the player
        this.ammoCount = 0; //Ammo of the player
    }
    increaseLevel(){}
    /*displayHealth(){
        push();
        fill("green");
        translate(this.sprite.position.x,this.sprite.position.y);
        rectMode(CENTER);
        rect(0,0,100,10);
        pop();
    }*/
    updateSurfaceArea(count,toIncrease) {
        //Updating the dimensions of the blob
        this.radius = sqrt(count/PI);
        this.sprite.height = this.sprite.width = this.radius;
        //Increasing ammo count if the argument is given
        if(toIncrease == true)
            this.ammoCount++;
    }
    update() {
        //limiting the player speed by the amount of ammo it has
        this.sprite.limitSpeed(10/this.sprite.mass);

        //this.displayHealth();

        //User controls
        if (keyDown('w')) {
            this.sprite.addSpeed(2,this.sprite.rotation);
        } else if (keyDown('s')) {
            this.sprite.addSpeed(-2,this.sprite.rotation);
        } if (keyDown('a')) {
            this.sprite.rotation -= 4;
        } else if (keyDown('d')) {
            this.sprite.rotation += 4;
        }
    }
    //Function to release the ammo of the player
    releaseAmmo() {
        let corangle = this.sprite.rotation % 360;  //Correct angle
        //Creating the sprite at the border of the circle so that it does not collide with it
        let bullet = createSprite(this.sprite.x+(this.sprite.width/2)*cos(corangle)+5,this.sprite.y+(this.sprite.height/2)*sin(corangle)+5,10,10);
        bullet.depth = this.sprite.depth - 1;   //Setting depth
        //Drawing bullets as a circle 
        bullet.draw = ()=>{
            push();
            fill("red");
            ellipse(0,0,10,10);
            pop();
        };
        bullet.life = 75;   //Lifetime of the bullet(to prevent memory leak)

        //Setting the speed of the bullet as a sum of the previous of the player and 5
        //So that the player may not overlap the bullet
        bullet.setSpeed(this.sprite.getSpeed() + 5,this.sprite.rotation+floor(random(-5,5)));
        this.bullets.add(bullet);   //Adding it to the bullets group

        this.updateSurfaceArea(this.radius*this.radius*PI-500,false);   //Updating the new surface area
        this.sprite.mass -= .05;    //Decreasing the mass of the player because it has realeased bullets

        this.ammoCount--;   //Decreasing the ammo count
    }
}