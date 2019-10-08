
// get the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = {
	score: 0, 
	player: player, // holds the player object
	rightPressed: false, // if the right arrow key is pressed
	leftPressed: false, // if the left arrow key is pressed
	upPressed: false, // if the top arrow key is pressed
	downPressed: false, // if the bottom arrow key is pressed
	leftWall: null, // holds a wall object
	rightWall: null, // holds a wall object
	delayWalls: false, // used to delay the creation of walls

	// animation before the game starts
	startAnimation() {
		// create a 3 second countdown timer before the game starts
		let startTimer = 3;
		const startInterval = setInterval(() => {
			// update the countdown 
			$('#count-down').text(startTimer);
			// decrement timer 
			startTimer--;
			// when the timer reaches 0
			if (startTimer === 0) {
				// hide the countdown timer
				$('#count-down').fadeOut(250);
				// clear the interval
				clearInterval(startInterval); 
			}
		}, 1000);
	},

	// main game loop
	start() {

		// set the initial x and y positions of the player
		this.player.x = canvas.width / 2;
		this.player.y = canvas.height - 100;

		// create the initial two walls
		this.createWalls();

		// set the game interval - updates every 10 milliseconds
		const interval = setInterval(() => {
			// clear the canvas every interval
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// draw the player 
			this.player.draw(ctx);

			// if the walls passed of the canvas
			if (this.wallsPassed()) {
				if (this.delayWalls === false) {
					this.createWalls(); // create the walls
				}
			}

			// draw both fo the walls
			this.leftWall.draw(ctx);
			this.rightWall.draw(ctx);

			// move both of the walls
			this.leftWall.move();
			this.rightWall.move();

			// if the right key is pressed 
			if (this.rightPressed === true) {
				player.moveRight();
			} 
			// if the left key is pressed
			if (this.leftPressed === true) {
				player.moveLeft();
			}
			// if the right key is pressed 
			if (this.topPressed === true) {
				player.moveUp();
			} 
			// if the left key is pressed
			if (this.downPressed === true) {
				player.moveDown();
			}

			// collision detection for the canvas walls
			this.canvasCollision();

			// if the player collides with the walls
			if (this.wallCollision()) {
				this.stop();
				clearInterval(interval);

			}

			// update the score and level
			this.updateScore();

		}, 5);
	},

	// stops the game 
	stop() {
		$('.game-over-container').fadeIn(250);
		$('#final-score').html('<span>Score: </span>' + this.score);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},

	// updates the score and the level
	updateScore() {
		// if the player passed the walls
		if (this.leftWall.y === canvas.height) {
			this.score++; // increment the score 
			$('#score').html('<span>Score: </span>' + this.score); // update the UI
		}	
	}, 

	// detects if the player collides into the walls
	wallCollision() {

		// if player collides with the left wall -> return true
		if (this.player.x - this.player.radius < this.leftWall.x + this.leftWall.width && 
			this.player.x + this.player.radius > this.leftWall.x &&
			this.player.y - this.player.radius < this.leftWall.y + this.leftWall.height &&
			this.player.y + this.player.radius > this.leftWall.y) {
			return true; 
		}

		// if player collides with the right wall -> return true
		if (this.player.x - this.player.radius < this.rightWall.x + this.rightWall.width &&
			this.player.x + this.player.radius > this.rightWall.x &&
			this.player.y - this.player.radius < this.rightWall.y + this.rightWall.height &&
			this.player.y + this.player.radius > this.rightWall.y) {
			return true;
		}

		// if there is not collision -> return false
		return false;
	},

	// this method checks of the walls passed off the
	// canvas
	wallsPassed() {
		// if the walls are off the screen
		if (this.leftWall.y >= canvas.height) {
			return true;
		}
		return false;
	},

	// detects if the player collides with the sides
	// of the canvas area 
	canvasCollision() {
		// if player touches the left wall
		if (this.player.x - this.player.speedX < this.player.radius) {
			this.player.x += 3;
			return;
		}
		// player touches the right wall
		if (this.player.x + this.player.speedX > canvas.width - this.player.radius) {
			this.player.x -= 3;
			return;
		}
		// if player touches the top wall
		if (this.player.y - this.player.speedY < this.player.radius) {
			this.player.y += 3;
		}
		// if player touches the bottom wall
		if (this.player.y + this.player.speedY > canvas.height - this.player.radius) {
			this.player.y -= 3;
		}
	},

	// instantiates two wall objects and store them in the variables leftWall and rightWall
	createWalls() {

		// create the first wall - give it a random width
		const leftWallWidth = Math.floor(Math.random() * (canvas.width - 40));
		const leftWall = new Wall(leftWallWidth, 0);
			
		// create the second wall 
		const rightWallWidth = (canvas.width - leftWall.width) - 40;
		const rightWall = new Wall(rightWallWidth, canvas.width);

		// add both walls to the wall properties
		this.leftWall = leftWall;
		this.rightWall = rightWall;
	}, 
}



// button click event listener
$('button').on('click', (e) => {
	const targetID = $(e.target).attr('id');

	// if the start game or play again button was clicked
	if (targetID === 'start-btn') {
		$('.start-menu').fadeOut(500); // hide the start menu
		game.startAnimation()// start the countdown animation
		
		// start the game after 3.75 second
		setTimeout(() => {
			game.start(); 
		}, 3750)
	}

	// if the play again button was clicked
	if (targetID === 'play-again-btn') {
		document.location.reload(); 
	}
});

// listener for when keys are pressed down
$(document).on('keydown', (e) => {
	const keycode = e.keyCode;

	// if the right arrow was pressed
	if (keycode === 39) {
		game.rightPressed = true;
	} 
	// if the left arrow was pressed
	if (keycode === 37) {
		game.leftPressed = true;
	}
	// if the top arrow was pressed
	if (keycode === 38) {
		game.topPressed = true;
	}
	// if the bottom arrow was pressed
	if (keycode === 40) {
		game.downPressed = true;
	}
});

// listener for when keys are released
$(document).on('keyup', (e) => {
	const keycode = e.keyCode;

	// if the right arrow was pressed
	if (keycode === 39) {
		game.rightPressed = false;
	} 
	// if the left arrow was pressed
	if (keycode === 37) {
		game.leftPressed = false;
	}
	// if the top arrow was pressed
	if (keycode === 38) {
		game.topPressed = false;
	}
	// if the bottom arrow was pressed
	if (keycode === 40) {
		game.downPressed = false;
	}
});




	







