class Player {
    constructor(x, y) {
        this.sprite = createSprite(x, y, 64, 64); //Creating sprite for the player
    }
    updateSurfaceArea(count) {
        //Updating the dimensions of the blob
        this.sprite.height = count / this.sprite.height;
        this.sprite.width = count / this.sprite.width;
    }
    update() {
        //Focusing viewport on player
        camera.position.x = this.sprite.position.x;
        camera.position.y = this.sprite.position.y;

        //User controls
        if (keyDown('w')) {
            this.sprite.position.y -= 5 / this.sprite.mass;
        } else if (keyDown('s')) {
            this.sprite.position.y += 5 / this.sprite.mass;
        } if (keyDown('a')) {
            this.sprite.position.x -= 5 / this.sprite.mass;
        } else if (keyDown('d')) {
            this.sprite.position.x += 5 / this.sprite.mass;
        }
    }
}