class Station {
    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        this.min_size = s;
        this.size = s;
    }

    // 76,114,176

    draw(color = '#000000') { //#2168f5
        strokeWeight(this.size); 
        stroke(color);
        point(this.x, this.y, 1);

        if (this.size > this.min_size) {
            this.size -= this.size * 0.05;
        }
    }

    giveCoords() {
        return [this.x, this.y];
    }

}