// Load managers
var stationmanager = new StationManager();
var trailmanager = new TrailManager();
var bikemanager = new BikeManager();

// Time continuity related
var start = 3; // Select an hour of the day where start the animation
var frame = 0 + (start * 150);

// Engine related
var boost = 1;
var mu_daily_bikes = 5090 * boost, sd_daily_bikes = 1755;
var total_for_day = Math.floor(normal(mu_daily_bikes, sd_daily_bikes));

// Colors
var common_trip = '#ea0c52';
var downtown_trip = '#2168f5';
var loop_trip = '#853aa3';
var bikeArrivesColor = '#d3af1d';

// Display
var canvas;
var pixelh;
var pixelv;

function preload() {
    bg = loadImage("assets/map-color.png");
};

function setup() {
    frameRate(30);

    // Canvas related
    createCanvas(bg.width, bg.height);
    pixelv = bg.height / 100;
    pixelh = bg.width / 100;

    // Create trips data
    generate_probabilistic_model(total_for_day);
    
    // Prepare station's data
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
    trailmanager.draw();
    bikemanager.draw();
    stationmanager.draw();

    // Related to movement
    bikemanager.update();
    
    // Hour of the day related
    let hour = Math.floor(frame/150);
    let minute = Math.floor(60*((frame%150)/150));

    drawDisplay(hour, minute);

    // Related to frame continuity
    frame++;
    
    if (frame > 3600) {
        frame = 0;
    }
};

function drawDisplay(hour, minute) {
    
    hour = (hour == 24) ? 0 : hour;

    strokeWeight(0);
    textFont('Ubuntu');
    
    textSize(36);
    fill('#ffffff');
    text(`${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`, bg.width - (bg.width * 0.111), bg.height * 0.268);
    
    fill(255,255,255,250);
    rect(pixelh * 99 - pixelh * 22, pixelv, pixelh * 22, pixelv * 5.75);
    rect(pixelh * 99 - pixelh * 17.25, pixelv * 7.5, pixelh * 17.25, pixelv * 5.75);
    rect(pixelh * 99 - pixelh * 12, pixelv * 14, pixelh * 12, pixelv * 5.75);
    noFill();
    stroke(255,255,255,250);
    strokeWeight(3);
    rect(pixelh * 99 - pixelh * 12, pixelv * 20.5, pixelh * 11.9, pixelv * 8.5, 5);
    strokeWeight(0);
    fill('#525252');
    textSize(21);
    text(`${Math.floor(total_for_day / boost)} daily bicycle users`, pixelh * 78, pixelv*5);
    text(`${('00' + Math.floor(Object.keys(bikemanager.queue).length / boost)).slice(-3)} bicycles in use`, pixelh * 82.5, pixelv*11.5);
    text(`${Math.floor(Object.keys(stationmanager.queue).length)} stations`, pixelh * 87.75, pixelv*18);

    fill(103,136,160,240);
    rect(pixelh*3.5,pixelv*86.75, pixelh*15.75, pixelv*3.8);
    rect(pixelh*3.5,pixelv*90.95, pixelh*21.75, pixelv*3.8);
    rect(pixelh*3.5,pixelv*95.2, pixelh*29.75, pixelv*3.8);

    fill(33,104,245,230);
    rect(pixelh,pixelv*86.75, pixelh*2.15, pixelv*3.8);
    fill(234,12,82,230);    
    rect(pixelh,pixelv*90.95, pixelh*2.15, pixelv*3.8);
    fill(133,58,163,230);
    rect(pixelh,pixelv*95.2, pixelh*2.15, pixelv*3.8);

    fill('#ffffff');
    textSize(14);
    text('Bike heading downtown', pixelh*3.95, pixelv*89.5);
    text('Bike heading away from downtown', pixelh*3.95, pixelv*93.8);
    text('Bike departuring and arriving at the same station', pixelh*3.95, pixelv*97.85);

    strokeWeight(10);
    stroke('#525252');
    fill('#ffffff');
    textSize(16);
    text('@nonsignificantp', pixelh * 87.75, pixelv * 98.5);
}