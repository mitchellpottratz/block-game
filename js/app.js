
// get the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = {
	score: 0,
	level: 1,
	player: player, // holds the player object
	rightPressed: false, // if the right arrow key is pressed
	leftPressed: false, // if the left arrow key is pressed
	leftWall: null,
	rightWall: null,
	delayWalls: false, // used to delay the creation of walls

	// main game loop
	start() {
		// set the initial x and y positions of the player
		this.player.x = canvas.width / 2;
		this.player.y = canvas.height - 100;

		// set the game interval - updates every 10 milliseconds
		const interval = setInterval(() => {
			// clear the canvas every interval
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// draw the player 
			this.player.draw(ctx);

			// if there arent any walls
			if (this.leftWall === null || this.rightWall === null) {
				if (this.delayWalls === false) {
					// create the walls
					this.createWalls();
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
				
			// collision detection for the canvas walls
			this.canvasCollision();

			// if the player collides with the walls
			if (this.wallCollision()) {
				console.log('Game Over');
				clearInterval(interval);
			}

			// check if the walls have pass of the canvas
			this.wallsPassed();

			// update the score and level
			this.updateScoreAndLevel();
		}, 5);
	},

	// stops the game 
	stop() {

	},

	// updates the score and the level
	updateScoreAndLevel() {
		// if the player passed the walls
		if (this.leftWall.y === canvas.height) {
			this.score++; // increment the score 
			$('#score').html('<span>Score: </span>' + this.score); // update the UI

			// every 10 points, increase the level by one
			if (this.score != 0 && this.score % 2 === 0) {
				this.level++; // increment the level
				$('#level').html('<span>Level: </span>' + this.level); // update the UI
				this.delayWalls = true; // this will stop the walls from being created
				this.levelAnimation(); // display the animation for a new level

				// after 2 seconds, start creating the walls again
				setTimeout(() => {
					this.delayWalls = false;
				}, 2000);
			}
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
		if (this.leftWall.y > canvas.height) {
			// set rightWall and leftWall properties to null
			this.leftWall = null;
			this.rightWall = null;
		}
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
	},

	// instantiates two wall objects and store them in the array
	createWalls() {
		// create the first wall - give it a random width
		const leftWall = new Wall(Math.floor(Math.random(canvas.width) * canvas.width) - (canvas.width / 8), 0);
			
		// create the second wall - width = (canvas.width - wallOne) - (canvas.width/10)
		const rightWall = new Wall((canvas.width - leftWall.width) - (canvas.width / 8), canvas.width);

		// add both walls to the wall properties
		this.leftWall = leftWall;
		this.rightWall = rightWall;
	}, 

	// animation for when a new level is reached
	levelAnimation() {
		const $levelPopup = $('#level-popup');
		$levelPopup.text('Level ' + this.level);
		$levelPopup.fadeIn(500);
		$levelPopup.delay(1000).fadeOut(500);
	}
}



// button click event listener
$('button').on('click', (e) => {
	const targetID = $(e.target).attr('id');

	// if the start game button was clicked
	if (targetID === 'start-btn') {
		$('.start-menu').fadeOut(500); // hide the start meny
		
		// create a 3 second countdown timer before the game starts
		let startTimer = 3;
		const interval = setInterval(() => {
			// update the countdown 
			$('#count-down').text(startTimer);
			// decrement timer 
			startTimer--;
			// when the timer reaches 0
			if (startTimer === 0) {
				// hide the countdown timer
				$('#count-down').fadeOut(250);
				// clear the interval
				clearInterval(interval); 
			}
		}, 1000);

		// start the game after 3.75 seconds
		setTimeout(() => {
			game.start();
		}, 3750);
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
});



	







