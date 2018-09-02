class Station {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5;
    }

    draw(color = {'r':76,'g':114,'b':176}) {
        strokeWeight(this.size); 
        stroke(color['r'],color['g'],color['b']);
        point(this.x, this.y, 1);

        if (this.size > 5) {
            this.size -= this.size * 0.1;
        }
    }

    giveCoords() {
        return [this.x, this.y];
    }

}