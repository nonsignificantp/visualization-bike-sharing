class Stations {
  
  constructor() {
    
  }
  
  draw() {
    Object.entries(stationData).forEach(function([key, value]){
        strokeWeight(5); 
        stroke(0,0,0); 
        point(value['x'], value['y']);
      }
    );  
  }

}

// ---------------------------------------------------------------------------------

class Bike {

  constructor(comes, goes, step, bikecode){
    [this.x1, this.y1] = this.getStationPosition(comes); // Current position
    [this.x2, this.y2] = this.getStationPosition(goes); // Future position
    
    this.bikecode = bikecode;
    this.pct = 0.0;
    this.step = 10 / Math.pow(step,2);
    this.distanceX = this.x2 - this.x1;
    this.distanceY = this.y2 - this.y1;
    
    // this.pwr = Math.random() * (2 - 0.5) + 0.5;
  }
  
  getStationPosition(stationNumber) {
    let data = stationData[stationNumber];    
    return [data['x'], data['y']];
  }
  
  move() {
    this.x = this.x1 + (this.pct * this.distanceX);
    this.y = this.y1 + (this.pct * this.distanceY);
    // this.y = this.y1 + (Math.pow(this.pct, this.pwr) * this.distanceY);
    this.pct += this.step;
  }
  
  draw() {
    strokeWeight(5);
    stroke(255,0,0);

    if (this.pct < 1.01){
      point(this.x, this.y);
    }
    if (this.pct > 1.01){
      this.eliminate();
    }
  }
  
  eliminate() {
    delete bikemanager.bikequeue[this.bikecode.toString()];
  }
  
}

// ---------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------

class BikeManager {

  constructor() {
  this.bikequeue = {};
  this.stationsCodes = Object.keys(stationData);
  }
  
  addBikes(hour) {
   
    // -------------------------------
    
    bikeData.forEach((entry) => {        
      if (entry['hour'] == hour) {
          if (entry['type'] == 'line') {
            
            let [x1, y1] = getStationPosition(entry['comes']);
            let [x2, y2] = getStationPosition(entry['goes']);
            strokeWeight(2);
            stroke(76,114,176,200);
            line(x1, y1, x2, y2);
          };
          if (entry['type'] == 'bike') {
            let prob = Math.random();
            if (prob < entry['data']) {
              let bikecode = Math.random().toString(36).substring(2,12);
              this.bikequeue[bikecode.toString()] = new Bike(entry['comes'],entry['goes'], Math.floor(Math.random() * (40 - 30)) + 30,bikecode);
            }
          }
          
        }
      }
    );
  
    // -------------------------------
    
  }

  
  draw() {
    Object.entries(this.bikequeue).forEach(
        ([key, value]) => value.draw()
        );
  }
  
  update() {
    Object.entries(this.bikequeue).forEach(
        ([key, value]) => value.move()
        );
  }
  
  
}