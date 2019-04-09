function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.display = function() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.strokeStyle = 'navy';
        context.stroke();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || 
            this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || 
            this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;
        
        this.display();
    }
}

let circle_array = [];

for(let i = 0; i < 100; i++) {
    let radius = 30;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5);
    let dy = (Math.random() - 0.5);

    cicle_array.push(new Circle(x, y, dx, dy, radius);
}

function drawAnimate() {
    requestAnimationFrame(drawAnimate);     // i am curious to know why this is written on the first line of the function
    context.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < circle_array.length; i++) {
        circle_array[i].update();
    }     
}

drawAnimate();

//am i ever gonna live up to his life.