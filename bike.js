var downtown = [50,135,3,127,24,22,184,120,100,76,60,171,34,90,46,56,68,224,191,192,138,47,106,49,89,143,200,142,42,186,18,35,26,132,16,140,174,10,36,139,96,27,109,7,170,5,57,37,165,218,137,38,4,19,99,2,180,181,48,164,75,43,188,23,67,211,11,45,134,98,121,208];

class Bike {
    constructor(comes, goes, duration, code) {
    // Exog variables
        [this.x1, this.y1] = this.getCoords(comes);
        [this.x2, this.y2] = this.getCoords(goes);
        this.trip = (comes != goes) ? 'path' : 'circle';
        this.end = goes;
        this.code = code;
        this.color = (this.trip == 'circle') ? '#f2915a' : (downtown.includes(goes)) ? '#2168f5' : '#ea0c52';


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
        stroke(this.color); //243,12,82 . 196,78,82
        point(this.x, this.y, 10);
    }

    move() {
        if (this.trip == 'path') {
            this.x = this.x1 + (this.transform(this.pct, 'x') * this.distanceX);
            this.y = this.y1 + (this.transform(this.pct, 'y') * this.distanceY);
            this.pct += this.step;
        }

        if (this.trip == 'circle') {
            this.x = this.x1 + (20*Math.cos(( 360 * this.pct) * (Math.PI / 180)));
            this.y = this.y1 + (20*Math.sin(( 360 * this.pct) * (Math.PI / 180)));
            this.pct += this.step;
        }

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

