class Block {

	constructor(x) {
		this.width = 15;
		this.height = 15;
		this.x = x;
		this.y = 0;
		this.color = '#FFD700'; // gold
		this.speedY = 0.5;
		this.collected = false;
		this.passed = false;
	}	

	// draws the block on the canvas
	draw(ctx) {
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	// moves the block down 
	move() {
		this.y += this.speedY;
	}

	// called when the block is collected by the player
	isCollected() {
		this.collected = true;
	}

	// called when block passes off the canvas
	hasPassed() {
		this.passed = true;
	}
}