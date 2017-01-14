// Util.
function getRandomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}

function getRandomRGB(restr) {
    if (!restr) {
        restr = {
            red  : { min: 0, max: 255 },
            green: { min: 0, max: 255 },
            blue : { min: 0, max: 255 }
        }
    } else if (restr === 'star') {
        restr = {
            red  : { min: 240, max: 255 },
            green: { min: 130, max: 255 },
            blue : { min: 0, max: 0 }
        }
    }

    let red   = getRandomInt(restr.red.min, restr.red.max);
    let green = getRandomInt(restr.green.min, restr.green.max);
    let blue  = getRandomInt(restr.blue.min, restr.blue.max);

    return Snap.getRGB(`rgb(${red}, ${green}, ${blue})`);
}

class System {
    // Public.
    constructor(id) {
        this.width = document.getElementById(id).clientWidth;
        this.height = document.getElementById(id).clientHeight;

        this.paper = Snap(`#${id}`);

        this.sizeRatio = this.width / 20;

        this.sun = this._createSun();
        this._createStars();

        this.planets = [];

        this.paper.click((e) => {
            this.__createPlanet(e.offsetX, e.offsetY);
        });
    }

    startAnimation() {
        let rotationAngle = 0;
        let sunRadius = this.sun.getBBox().width / 2;
        let sunCoordinates = {
            x: this.sun.getBBox().x + sunRadius,
            y: this.sun.getBBox().y + sunRadius
        };

        setInterval(() => {
            for (let planet of this.planets) {
                planet.transform(`r${planet.rotationAngle},${sunCoordinates.x},${sunCoordinates.y}`);
                planet.rotationAngle++;
            }
        }, 1000 / 30);
    }

    // Private.
    _createStars() {
        let starsCount = Math.floor(this.sizeRatio * 20);
        let intervalId = setInterval(() => {
            this.paper
                .circle(Math.random() * this.width,
                        Math.random() * this.height,
                        Math.random())
                .before(this.sun)
                .attr({ fill: getRandomRGB('star') });

            starsCount ? starsCount-- : clearInterval(intervalId);
        });
    }

    _createSun() {
        return this.paper
            .circle(this.width / 2, this.height / 2, this.sizeRatio)
            .attr({
                fill: getRandomRGB('star'),
                stroke: getRandomRGB('star'),
                strokeWidth: this.sizeRatio / 10,
            });
    }

    __createPlanet(x, y) {
        let planet = this.paper
            .circle(x, y, 15 + Math.random() * this.sizeRatio / 2)
            .attr({ fill: getRandomRGB() });

        planet.rotationAngle = 0;

        this.planets.push(planet);
    }
}

let pl = new System('screen');
pl.startAnimation();