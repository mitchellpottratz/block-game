
const player = {
	radius: 10,
	x: 0,
	y: 0,
	speedX: 2,
	speedY: 2,
	color: '#0095DD',
	isInvinsible: false,
	firstTouch: {x: null, y: null},

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
		this.x += this.speedX;
	},

	// move the player left
	moveLeft() {
		this.x -= this.speedX;
	},

	// move the player up
	moveUp() {
		this.y -= this.speedY;
	},

	// move the player down
	moveDown() {
		this.y += this.speedY;
	},

	// move the player based on the position of the touches on the screen
	touchMove(touch) {
		// set the position of the player to the positon of the touch
		this.x = touch.x;
		this.y = touch.y - 85;

	},

	// give the player the invinsibility for 5 seconds power up every 10 blocks
	// they collect
	giveInvinsibility(blocksCollected) {
		// if they collected 10 blocks
		if (blocksCollected % 15 === 0 && blocksCollected !== 0) {
			game.blocksCollected++;

			const $notificationBar = $('.power-up-notifier');
			const $notificationText = $('#power-up-text');

			// display the notification bar and set the text
			$notificationText.text('You are Invinsible!');
			$notificationBar.fadeIn();

			// give the player super powers!!!
			this.isInvinsible = true;

			// make the player blink red and blue while they are invinsible
			let timer = 0;
			const interval = setInterval(() => {
				this.color = 'red';
				
				setTimeout(() => {
					this.color = '#0095DD';
				}, 200);

				if (timer > 12) {
					clearInterval(interval);
					$notificationBar.fadeOut();
					this.color = '#0095DD';
					this.isInvinsible = false;
				} 
				timer++;
			}, 400);
		}
	}
}



