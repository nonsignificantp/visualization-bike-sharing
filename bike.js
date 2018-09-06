class Bike {
    constructor(comes, goes, duration, code) {
    // Exog variables
        [this.x1, this.y1] = this.getCoords(comes);
        [this.x2, this.y2] = this.getCoords(goes);
        this.end = goes;
        this.code = code

    // Endog variables
        // Behavior
        this.step = 1/((150/60)*duration); // Better between 0.01 and 0.008
        this.curve = Math.random() * (2 - 0.4) + 0.4;
        // Movement & Distance
        this.pct = 0.0;
        this.distanceX = this.x2 - this.x1;
        this.distanceY = this.y2 - this.y1;
    }

    draw() {
        strokeWeight(5);
        stroke(243,12,82); //196,78,82
        point(this.x, this.y, 10);
    }

    move() {
        this.x = this.x1 + (this.transform(this.pct, 'x') * this.distanceX);
        this.y = this.y1 + (this.transform(this.pct, 'y') * this.distanceY);

        this.pct += this.step;

        if (this.pct > 1.0) {
            bikemanager.takeOutTrash(this.code, this.end);
        }
    }

    getCoords(stationNumber) {
        return stationmanager.getCoords(stationNumber);
    }

    transform(z, ax) {
        if (ax == 'y') {
            let result = Math.sin(( 90 * z) * (Math.PI / 180));
            return Math.pow(result, this.curve);
        }
        if (ax == 'x') {
            let result = 1 - Math.cos(( 90 * z) * (Math.PI / 180));
            return Math.pow(result, this.curve);
        }
    }
}

