class BikeManager {
    constructor() {
        this.queue = {};
    }

    /* 
    Data example
    [{"type":"bike","hour":0,"comes":9,"goes":30,"data":1.00},
     {"type":"line","hour":0,"comes":9,"goes":65,"data":0.67}
    */

    add(data, flowControl) {
        data.forEach((trip) => {
            if (trip['type'] == 'bike') {
                let flow = Math.random();
                if (trip['hour'] == this.hour & (trip['data'] * flowControl) > flow) {
                    let bikecode = Math.random().toString(36).substring(2,12);
                    this.queue[bikecode] = new Bike(trip['comes'], trip['goes'], bikecode)
                }
            }
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
        stationmanager.updateSize(stationNumber, 5);
        stationmanager.updateColor(stationNumber, {'r':221,'g':132,'b':82});
        delete this.queue[bikecode];
        
    }

    setHour(hour) {
        this.hour = hour;
    }
}