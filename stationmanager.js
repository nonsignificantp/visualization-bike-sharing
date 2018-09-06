class StationManager {
    constructor() {
        this.queue = {};
    }

    draw() {
        Object.values(this.queue).forEach((station) => {
            station.draw();
        });

    }

    updateSize(stationNumber, size) {
        let reference = this.queue[stationNumber].size
        reference += size
        // Size never drops below 0
        if (reference > 0) {
            this.queue[stationNumber].size = reference;
        }
    }

    updateColor(stationNumber, newColor) {
        this.queue[stationNumber].draw(newColor)
    }

    init(data) {
        /*var lft = -34.5680738914; // Original: -34.5680738914
        var rgt = -34.6417279105;// - 0.003; // Original: -34.6417279105
        var top = -58.4550621944;// - 0.005; // Original: -58.4550621944
        var bot = -58.3562574145;// + 0.005; // Original: -58.3562574145*/

        var top = -34.565030; var lft = -58.493404;
        var bot = -34.643467; var rgt = -58.325200;
        
        
        
        data.forEach((station) => {
            // Define station variables
            let x = Math.floor(((lft - station['longitude']) * screenWidth) / (lft - rgt));
            let y = Math.floor(((top - station['latitude']) * screenHeight) / (top - bot));            

            // Create station instance
            this.queue[station['id']] = new Station(x, y)

        });

    }

    getCoords(stationNumber) {
        return this.queue[stationNumber].giveCoords()
    }

}

/*
Data object example
data = [
        {"id":144,"latitude":-34.6339776264,"longitude":-58.4009623109},
        {"id":50,"latitude":-34.6016384998,"longitude":-58.3711554749}
       ]
*/