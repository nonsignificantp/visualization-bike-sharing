// Canvas related
var screenWidth = 1100; //window.innerWidth * 0.99
var screenHeight = screenWidth * (620/1100)// window.innerHeight-10;

// Load managers
var stationmanager = new StationManager();
var bikemanager = new BikeManager();

// Time continuity related
var frame = 0;

// Flow related
var rate = [0.17, 0.11, 0.05, 0.03, 0.03, 0.06, 0.14, 0.42, 0.71, 0.66, 0.5, 0.54, 
            0.67, 0.78, 0.75, 0.75, 0.84, 0.98, 1.0, 0.69, 0.58, 0.45, 0.32, 0.23];

// Engine related
var boost = 1;
var mu_daily_bikes = 5090 * boost;
var sd_daily_bikes = 1755;

function setup() {
    // Canvas related
    frameRate(30);
    bg = loadImage("assets/map5.png");
    createCanvas(screenWidth, screenHeight);
    generate_probabilistic_model();
    
    // Data related
    stationmanager.init(stations);
};

function draw() {
    // Canvas related
    background(bg);
    
    // Bikes creation related
    if (frame in frameBook) {
        bikemanager.add(frameBook[frame]);
    }

    // Bikes & Stations drawing related
    bikemanager.draw();
    stationmanager.draw();

    // Related to movement
    bikemanager.update();
    

    frame++;
    
    // Hour of the day related
    let hour = Math.floor(frame/150);
    
    fill(255,255,255);
    stroke(255,255,255);
    strokeWeight(0);
    	
    triangle(1065, 121, 1075, 126, 1065, 131);
    triangle(1065, 466, 1075, 471, 1065, 476);
    text(`Active bikes ${Object.keys(bikemanager.queue).length}`, 920, 20);
    text('00\n01\n02\n03\n04\n05\n06\n07\n08\n09\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21\n22\n23', 1080, 130);

    // Related to frame continuity
    if (frame > 3600) {
        frame = 0;
    }
};

function logit(x, turnpoint) {
    if (x < turnpoint) {
        return (1 / (1 + (1 * Math.pow(Math.E, 0.1*(x-30)))));
    } else if (x >= turnpoint) {
        return (1 / (1 + (1 * Math.pow(Math.E, 0.05*-(x)+100))));
    }
    
}