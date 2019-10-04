
const player = {
	radius: 10,
	x: 0,
	y: 0,
	speedX: 3,
	color: '#0095DD',

	// draws the player in the canvas
	draw(ctx) {
		// draw the player on the canvas
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();	
	},

	// moves the player right
	moveRight() {
		console.log('Move right');
		this.x += this.speedX;
	},

	// move the player left
	moveLeft() {
		console.log('Move left');
		this.x -= this.speedX;
	}
}



