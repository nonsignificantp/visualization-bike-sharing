// Canvas related
var screenWidth = 1100; //window.innerWidth * 0.99
var screenHeight = screenWidth * (620/1100)// window.innerHeight-10;

// Load managers
var stationmanager = new StationManager();
var bikemanager = new BikeManager();

// Time continuity related
var start = 3; // Select an hour of the day where start the animation
var frame = 0 + (start * 150);

// Engine related
var boost = 2;
var mu_daily_bikes = 5090 * boost;
var sd_daily_bikes = 1755;

function setup() {
    // Canvas related
    frameRate(30);
    bg = loadImage("assets/map.png");
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
    
    // Hour of the day related
    let hour = Math.floor(frame/150);
    let minute = Math.floor(60*((frame%150)/150));
    
    
    strokeWeight(0);
    fill(255,255,255);
    rect(890, 10, 200, 60, 12, 3, 12, 12);
    fill(0,0,0);
    textSize(48);
    textFont('Share Tech Mono');
    text(`${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`, 925, 57);
    fill(255,255,255);
    textSize(16);
    text(`Active bikes ${Object.keys(bikemanager.queue).length}`, 920, 90);
 

    // Related to frame continuity
    frame++;
    
    if (frame > 3600) {
        frame = 0;
    }
};