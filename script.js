// Globals' corner
let xcanvas = 770;
let ycanvas = 580;
// let bikecode = 0;
let stationNumber = 30;
let frame = 0;

//Objects' corner
let stations = new Stations();
let bikemanager = new BikeManager();

function setup() {
  frameRate(30);
  bg = loadImage("assets/map.png");
  createCanvas(xcanvas, ycanvas);  
}

function draw() {
  frame++;
  if (frame > 3600) {
    frame = 0;
  }
  
  background(bg);
  stations.draw();
  
  let prob = Math.random();
  let hour = Math.floor(frame/150)
  
  if (prob < rateData[hour]) {
    bikemanager.addBikes(hour);
  }
  bikemanager.draw();
  bikemanager.update();
  
  /*
  reciprocity.forEach((entry) => {
    strokeWeight(2);
    stroke(76,114,176,10);
    line(entry['comes'][0], entry['comes'][1], entry['goes'][0], entry['goes'][1]);
  });
  */
  
  noStroke();
  textSize(12);
  fill(255, 0, 0);
  
  text(`Hour = ${hour}\nNumber bikes: ${Object.keys(bikemanager.bikequeue).length}`, 620, 19);
}

  function getStationPosition(stationNumber) {
    let data = stationData[stationNumber];    
    return [data['x'], data['y']];
  }