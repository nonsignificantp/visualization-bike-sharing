class StationManager {
    constructor() {
        this.station_of_interest = [9,14,167,30,29,56,159,65,17,70,59,193,5,76,85,122,43,96,113,13,163,140,73,68,82,104,143,183,121,131,189,28,170,199,2,134,144,106,148,130,147,6,33,111,32,4,114,3,23,26,11,60,40,164,36,1,44,18,161,165];
        this.queue = {}; // Saves all station objects
    }

    draw() {
        Object.values(this.queue).forEach((station) => {
            station.draw();
        });

    }

    updateSize(stationNumber, size) {

        /* Each time a bicycle arrives at the station, its size increase */

        let reference = this.queue[stationNumber].size
        reference += size
        // Size never drops below 0
        if (reference > 0 & reference < 35) {
            this.queue[stationNumber].size = reference;
        }
    }

    updateColor(stationNumber, newColor) {

        /* Each time a bicycle arrives at the station, its color change */

        this.queue[stationNumber].draw(newColor)
    }

    init(data) {
        
        /*
        Adapts each station geolocation to the maps bounderies, transform latitude and logitude in
        x and y pixel coordinates
        */
        
        var top = -34.565030, lft = -58.493404; // Map boundaries
        var bot = -34.643467, rgt = -58.325200; // Map boundaries
                
        data.forEach((station) => { // Create a station object for each datapoint
            // Define station variables
            let x = Math.floor(((lft - station['longitude']) * bg.width) / (lft - rgt));
            let y = Math.floor(((top - station['latitude']) * bg.height) / (top - bot));            
            let s = (this.station_of_interest.includes(station['id'])) ? 6 : 2;
            // Create station instance
            this.queue[station['id']] = new Station(x, y, s);

        });

    }

    getCoords(stationNumber) {

        /* 
        When provided with an station ID, returns X and Y coordinates 
        for each stations as needed
        */

        return this.queue[stationNumber].giveCoords()
    }

}