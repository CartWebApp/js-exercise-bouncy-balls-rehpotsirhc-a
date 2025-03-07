// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
    const num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

// include some parameters that define the properties each ball needs to function

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

// draw a ball

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

// Updating the ball's data

Ball.prototype.update = function() {

    // if statements: check whether the ball has reached the edge of the canvas

    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    // ball is in effect moved each time this method is called

    this.x += this.velX;
    this.y += this.velY;
}

// collision detection

Ball.prototype.collisionDetect = function() {
    for (var j=0;j<balls.length;j++) {
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if(distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgba(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) + ')';
            }
        }
    }
}

// Animating the ball

var balls = [];

function loop() {
    ctx.fillStyle = 'rgba(0,1,1,1)';
    ctx.fillRect(0,0,width,height);

    while (balls.length < 50) {
        var size = random(10,20);
        var ball = new Ball(
            random(0 + size,width - size),
            random(0 + size,height - size),
            random(-7,7),
            random(-7,7),
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
            size
        );
        balls.push(ball);
    }

    for (var i=0; i<balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    requestAnimationFrame(loop);
}

loop();
