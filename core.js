// Canvas related
var screenWidth = window.innerWidth / 1.8;
var screenHeight = screenWidth * 0.75324// window.innerHeight-10;

// Load managers
var stationmanager = new StationManager();
var bikemanager = new BikeManager();

// Time continuity related
var frame = 0;

// Flow related
var rate = [0.17, 0.11, 0.05, 0.03, 0.03, 0.06, 0.14, 0.42, 0.71, 0.66, 0.5, 0.54, 
            0.67, 0.78, 0.75, 0.75, 0.84, 0.98, 1.0, 0.69, 0.58, 0.45, 0.32, 0.23];

function setup() {
    // Canvas related
    frameRate(30);
    bg = loadImage("assets/map.png");
    createCanvas(screenWidth, screenHeight);
    
    // Data related
    stationmanager.init(stations);
};

function draw() {
    // Canvas related
    background(bg);
    
    // Hour of the day related
    let hour = Math.floor(frame/150);
    // let flow = Math.random();
    bikemanager.setHour(hour);

    // Bike creation
    let instantFrame = frame%150;
    let instantRate = rate[hour] - ((rate[hour]/175)*instantFrame); // Review flow control
    bikemanager.add(bikes, instantRate);

    // Bikes & Stations animation related
    stationmanager.draw();
    bikemanager.draw();

    // Related to movement
    bikemanager.update();

    // Related to frame continuity
    frame++;
    if (frame > 3600) {
        frame = 0;
    }
};