 
class Wall {
	
	constructor(width, x) {
		this.width = width;
		this.height = 30;

		// if the 'x' parameter is 0
		if (x === 0) {
			this.x = x;
		// if its not zero
		} else {
			this.x = x - this.width;	
		}

		this.y = 0;
		this.speedY = 1;
		this.color = this.generateRandomColor();	
	}	

	// draws 2 walls on the canvas
	draw(ctx) {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	// moves the wall
	move() {
		this.y += this.speedY;	
	}

	// generate random color (green, blue, red, yellow)
	generateRandomColor() {
		const colors = ['blue', 'green', 'red', 'yellow'];
		return colors[Math.floor(Math.random() * 4)];
	}


}