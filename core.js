// Load managers
var stationmanager = new StationManager();
var bikemanager = new BikeManager();

// Time continuity related
var start = 17; // Select an hour of the day where start the animation
var frame = 0 + (start * 150);

// Engine related
var boost = 1.5;
var mu_daily_bikes = 5090 * boost, sd_daily_bikes = 1755;
var total_for_day = Math.floor(normal(mu_daily_bikes, sd_daily_bikes));

// Colors
var common_trip = '#ea0c52';
var downtown_trip = '#2168f5';
var loop_trip = '#853aa3'; //f2915a
var bikeArrivesColor = '#d3af1d';

function preload() {
    bg = loadImage("assets/map.png");
    tl = loadImage("assets/top-left-notes.png"); 
    bl = loadImage("assets/bottom-left-notes.png");
    tr = loadImage("assets/top-right-notes.png");
};

function setup() {
    frameRate(30);

    // Canvas related
    createCanvas(bg.width, bg.height);
    
    // Create trips data
    generate_probabilistic_model(total_for_day);
    
    // Prepare station's data
    stationmanager.init(stations);
};

function draw() {
    // Canvas related
    background(bg);
    image(tl, bg.width * 0.01, bg.height * 0.01);
    image(bl, bg.width * 0.01, bg.height - bl.height - (bg.height * 0.01));
    image(tr, bg.width - tr.width - (bg.width * 0.01), bg.height * 0.01);

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
    
    // Text: Clock and live information
    
    strokeWeight(0);
    /* fill('#525252');
    textSize(48);
    textFont('Ubuntu');
    text(`${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`, 925, 57);*/
    
    fill('#525252');
    textSize(20);
    text(`${Math.floor(total_for_day / boost)}`, bg.width - tr.width - (bg.width * 0.002), bg.height * 0.052);
    text(`${ ('0' + Math.floor(Object.keys(bikemanager.queue).length / boost)).slice(-3) }`, bg.width - (bg.width * 0.176), bg.height * 0.116);
    text(`${Math.floor(Object.keys(stationmanager.queue).length)}`, bg.width - (bg.width * 0.125), bg.height * 0.18);
    
    textSize(36);
    fill('#ffffff');
    text(`${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`, bg.width - (bg.width * 0.1165), bg.height * 0.268);

    // Related to frame continuity
    frame++;
    
    if (frame > 3600) {
        frame = 0;
    }
};