/*
    NPC Character
    IGN Ammo
    On collecting it increases the size of the player and its ammo count
    This is the blueprint for creating the ammo object with all the core behavior and properties

    Main properties:
        * sprite - p5.play sprite
    
    Other properties:
        * hue - color of the ammo object
    
    Methods:
        * update - basically checks if the sprite is colliding with the player blob
*/
class Ammo {
    constructor(x, y) {
        this.sprite = createSprite(x, y, 16, 16); //Main property 1: the sprite
        /*
          Changing how to ammo object is drawn
          Default function draws a rectangle
          But we want an ellipse
        */
        this.sprite.draw = () => {
            push();
            colorMode(HSB);
            fill(this.hue, 100, 100, 0.8);
            ellipse(0, 0, this.sprite.width, this.sprite.height);
            pop();
        }

        this.hue = floor(random(360));  //Other property 1: the hue
    }
    //Update function
    //Basically checks if the sprite is overlapping the player
    eats() {
        //If sprite overlaps the player then the size of the player should be increased
        this.sprite.overlap(player.sprite, () => {
            player.updateSurfaceArea(player.sprite.height * player.sprite.width + PI * this.sprite.width * this.sprite.width);
            this.sprite.remove();
            player.sprite.mass += .01;
        });
    }
}