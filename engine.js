var hourly_rates = [0.0149,0.0094,0.0048,0.0027,0.0025,0.0052,0.0117,0.0345,0.0579,0.0549,0.0441,0.0482,0.06,0.0687,0.0658,0.0661,0.0743,0.0847,0.0863,0.061,0.0521,0.0402,0.0292,0.0208];
var hourly_total = [];
var frameBook = {};

function generate_probabilistic_model() {
    let total_day_ = normal(mu_daily_bikes, sd_daily_bikes);
    hourly_rates.forEach((rate) => {
        hourly_total.push(total_day_ * rate);
    });
    
    for (let hour = 0; hour < 24; hour++) {
        for (let count = 0; count < hourly_total[hour]; count++) {
            let pick = Math.random();
                comesData[hour].forEach((data) => {
                    if (pick < data['selector']) {
                        let comes = data['station'];
                        let [goes, mu, sd] = getgo(hour, comes);
                        let duration = normal(mu, sd);
                        createEntry(hour, comes, goes, duration);
                    }
                });
        }
    }
}

function normal(mu, sigma, nsamples) {
    if(!nsamples) nsamples = 15;
    if(!sigma) sigma = 1;
    if(!mu) mu=0;

    var run_total = 0;
    for(var i=0 ; i<nsamples ; i++){
        run_total += Math.random();
    }

    return sigma*(run_total - nsamples/2)/(nsamples/2) + mu;
}

function getgo(hour, stationNumber) {
    let options = goesData[hour][stationNumber];
    let pick = Math.random();
    
    for (let op = 0; 0 < options.length; op++) {
        if (pick < options[op]['selector']) {
            return [options[op]['station'], options[op]['duration_mean'], options[op]['duration_sd']];
        }
    }
    
}

function createEntry(h, c, g, d) {
    let min = 150 * h;
    let max = min + 150;
    let frame = Math.floor(Math.random() * (max - min)) + min;
    
    if (frame in frameBook) {
        if (frameBook[frame] instanceof Object) {
            if (Array.isArray(frameBook[frame])) {
                frameBook[frame].push({'comes':c, 'goes':g, 'duration':d});
            } else {
                let newframe = [];
                newframe.push(frameBook[frame]);
                newframe.push({'comes':c, 'goes':g, 'duration':d});
                frameBook[frame] = newframe;
            }
        }
        
    } else {
        frameBook[frame] = {'comes':c, 'goes':g, 'duration':d};
    }
}