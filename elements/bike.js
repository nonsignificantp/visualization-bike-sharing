// Groups all stations located in Buenos Aires dowtown.
var downtown = [50,135,3,127,24,22,184,120,100,76,60,171,34,90,46,56,68,224,191,192,138,47,106,49,89,143,200,142,42,186,18,35,26,132,16,140,174,10,36,139,96,27,109,7,170,5,57,37,165,218,137,38,4,19,99,2,180,181,48,164,75,43,188,23,67,211,11,45,134,98,121,208];

class Bike {

/* Object shaped as a color dot that moves between docking stations */

    constructor(comes, goes, duration, code) {

        /*
        Bike object requires the ID numbers of both the starting and ending station, a trip duration in
        minutes and a string to individualy identify each object.
        */

    // Exog variables
        this.trip = (comes != goes) ? 'path' : 'circle';
        [this.x1, this.y1] = this.getCoords(comes);
        [this.x2, this.y2] = this.getCoords(goes);
        this.code = code;
        this.end = goes;

    // Endog variables
        // Color
        this.color = (this.trip == 'circle') ? loop_trip : (downtown.includes(goes)) ? downtown_trip : common_trip;
        // Behavior
        this.curve = Math.random() * (2 - 0.4) + 0.4;
        this.step = 1/((150/60)*duration);
        // Movement & Distance
        this.distanceX = this.x2 - this.x1;
        this.distanceY = this.y2 - this.y1;
        this.pct = 0.0;

        this.history = [];
    }

    draw() {

        /* Draws a bike in a certain position and with size 5 and a color depending on this.trip variable */

        strokeWeight(5);
        stroke(this.color);
        point(this.x, this.y);
    }

    move() {

        /* Updates the X and Y positions */

        if (this.trip == 'path') {
            this.x = this.x1 + (this.pathTransform(this.pct, 'x') * this.distanceX);
            this.y = this.y1 + (this.pathTransform(this.pct, 'y') * this.distanceY);
            this.pct += this.step;
        } else if (this.trip == 'circle') {
            this.x = this.x1 + this.circleTransform(this.pct, 'x');
            this.y = this.y1 + this.circleTransform(this.pct, 'y');
            this.pct += this.step;
        }

        trailmanager.add(this.code, {'x':this.x, 'y':this.y, 'c':color(this.color), 'f':0});

        if (this.pct >= 1.0) {
            bikemanager.takeOutTrash(this.code, this.end);
        }
        
    }

    getCoords(stationNumber) {
        
        /* Converts an station ID number into pixel coordenates */
        
        return stationmanager.getCoords(stationNumber);
    }

    pathTransform(z, ax) {

        /* Draws a path shaped as a quarter of a circled */

        if (ax == 'y') {
            let result = Math.sin(( 90 * z) * (Math.PI / 180));
            return Math.pow(result, this.curve);
        } else  if (ax == 'x') {
            let result = 1 - Math.cos(( 90 * z) * (Math.PI / 180));
            return Math.pow(result, this.curve);
        }
    }

    circleTransform(z, ax) {

        /* Draws a path shaped as a full circled  around a station */

        if (ax == 'y') {
            let result = 20*Math.sin(( (360 * z) - 90) * (Math.PI / 180));
            return result;
        } else if (ax == 'x') {
            let result = 20*Math.cos(( (360 * z) - 90) * (Math.PI / 180));
            return result;
        }
    }

}

