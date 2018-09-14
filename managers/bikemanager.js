class BikeManager {
    constructor() {
        this.queue = {}; // Saves all bike objects
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

        /* Each time a bike arrives to a docking station, the bikes gets eliminated from the object's pool */

        // Tell the station that a bike has arrive
        let newSize = Math.floor(5 + (5 * (1/boost)))
        stationmanager.updateSize(stationNumber, newSize);
        stationmanager.updateColor(stationNumber, bikeArrivesColor); //ad588c
        trailmanager.dotTerminated(bikecode);
        
        // Deletes the bike
        delete this.queue[bikecode];
    }

}