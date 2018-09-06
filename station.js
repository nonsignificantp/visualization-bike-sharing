class Station {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5;
    }

    // 76,114,176

    draw(color = {'r':33,'g':104,'b':245}) {
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