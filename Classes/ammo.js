class Ammo {
    constructor(x, y) {
        this.sprite = createSprite(x, y, 16, 16);
        this.hue = floor(random(360));
        this.sprite.draw = () => {
            push();
            colorMode(HSB);
            fill(this.hue, 100, 100, 0.8);
            ellipse(0, 0, this.sprite.width, this.sprite.height);
            pop();
        }
    }
    update() {
        this.sprite.overlap(player.sprite, () => {
            player.updateSurfaceArea(player.sprite.height * player.sprite.width + PI * this.sprite.width * this.sprite.width);
            this.sprite.remove();
            player.sprite.mass += .01;
        });
    }
}