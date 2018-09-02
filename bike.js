class Bike {
    constructor(comes, goes, code) {
    // Exog variables
        [this.x1, this.y1] = this.getCoords(comes);
        [this.x2, this.y2] = this.getCoords(goes);
        this.end = goes;
        this.code = code

    // Endog variables
        // Behavior
        this.color = {'r':76,'g':114,'b':176};
        this.step = 1 / (Math.floor(Math.random() * (100 - 80)) + 80);
        this.curve = 1//Math.random() * (2 - 0.5) + 0.5;
        // Movement & Distance
        this.pct = 0.0;
        this.distanceX = this.x2 - this.x1;
        this.distanceY = this.y2 - this.y1;
    }

    draw() {
        strokeWeight(5);
        stroke(196,78,82);
        point(this.x, this.y, 10);
        /* if (this.tipo == 'line') {
            // Future warning! Lines do not update!
            strokeWeight(3);
            stroke(196,78,82);
            line(this.x1, this.y1, this.x2, this.y2);
        }  */
    }

    move() {
        this.x = this.x1 + (this.pct * this.distanceX);
        this.y = this.y1 + (Math.pow(this.pct, this.curve) * this.distanceY);
        this.pct += this.step;

        if (this.pct > 1.0) {
            bikemanager.takeOutTrash(this.code, this.end);
        }
    }

    getCoords(stationNumber) {
        return stationmanager.getCoords(stationNumber);
    }
}

