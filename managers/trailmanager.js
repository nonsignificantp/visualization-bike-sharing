class TrailManager {
    constructor() {
        this.queue = {};
        this.alpha = 0.6;
    }

    draw() {
        Object.keys(this.queue).forEach((element) => {
            noFill();
            beginShape();
            strokeWeight(1);
            this.queue[element].forEach((trail) => {
                stroke(trail.c);
                vertex(trail.x, trail.y)
            });
            endShape();

            if (this.queue[element].length > 45 || this.queue[element].f == 1) {
                this.queue[element].splice(0, 1);
            }

            if (this.queue[element].length == 0) {
                this.eliminate(element);
            }
        });
    }

    add(code, trail) {
        if (code in this.queue) {
            trail.c._array[3] = this.alpha;
            this.queue[code].push(trail);
        } else {
            trail.c._array[3] = this.alpha;
            this.queue[code] = [trail];
        }
    }

    eliminate(code) {
        delete this.queue[code];
    }

    dotTerminated(code) {
        this.queue[code].f = 1;
    }
}