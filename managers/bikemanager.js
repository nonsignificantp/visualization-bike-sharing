class BikeManager {
    constructor() {
        this.queue = {};
    }

    add(data) {
        data.forEach((bikeobj) => {
            let bikecode = Math.random().toString(36).substring(2,12);
            this.queue[bikecode] = new Bike(bikeobj['comes'], bikeobj['goes'], bikeobj['duration'],bikecode);
        });
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
        let newSize = Math.floor(5 + (5 * (1/boost)))
        stationmanager.updateSize(stationNumber, newSize);
        stationmanager.updateColor(stationNumber, '#ad588c'); // 221,132,82 
        delete this.queue[bikecode];
        
    }

    setHour(hour) {
        this.hour = hour;
    }
}