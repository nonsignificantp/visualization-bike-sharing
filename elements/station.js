class Station {

/* Object shaped as a black dot representing a docking station */

    constructor(x, y, s) {
        this.x = x;
        this.y = y;
        // Stations outside the top 5 most used have a size of 2, otherwise, size equals 5.
        this.min_size = s;
        this.size = s;
    }

    // 76,114,176

    draw(color = '#000000') { //#2168f5
        strokeWeight(this.size); 
        stroke(color);
        point(this.x, this.y, 1);

        /* If the size is bigger than the stationary size (min_size), start resting */

        if (this.size > this.min_size) {
            this.size -= this.size * (0.03 * boost); // Corrects by boosting
        }
    }

    giveCoords() {

        /* Returns the X and Y in pixels */

        return [this.x, this.y];
    }

}