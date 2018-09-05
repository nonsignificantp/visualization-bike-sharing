class BikeManager {
    constructor() {
        this.queue = {};
    }

    add(data) {
        if (Array.isArray(data)) {
            data.forEach((bikeobj) => {
                let bikecode = Math.random().toString(36).substring(2,12);
                this.queue[bikecode] = new Bike(bikeobj['comes'], bikeobj['goes'], bikeobj['duration'],bikecode);
            });
        } else {
            let bikecode = Math.random().toString(36).substring(2,12);
            this.queue[bikecode] = new Bike(data['comes'], data['goes'], data['duration'], bikecode);
        }
    }

    draw() {
        Object.values(this.queue).forEach((trip) => {
            trip.draw();
        });
    }

    update() {
        Object.values(this.queue).forEach((trip) => {
            trip.move();
        });
    }

    takeOutTrash(bikecode, stationNumber) {
        stationmanager.updateSize(stationNumber, 5);
        stationmanager.updateColor(stationNumber, {'r':221,'g':132,'b':82});
        delete this.queue[bikecode];
        
    }

    setHour(hour) {
        this.hour = hour;
    }
}