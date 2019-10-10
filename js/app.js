
// get the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = {
	score: 0, 
	timer: 0, // game timer
	player: player, // player object

	// direction the player moves
	direction: {
		rightPressed: false, 
		leftPressed: false, 
		upPressed: false, 
		downPressed: false
	},

	// holds the two walls
	walls: {
		leftWall: null, 
		rightWall: null, 
	},

	delayWalls: false, // used to delay the creation of walls
	blocks: [], // array to hold block object
	blocksCollected: 0, // number of blocks the player collected

	// animation before the game starts
	startAnimation() {
		// create a 3 second countdown timer before the game starts
		let startTimer = 3;
		const startInterval = setInterval(() => {
			$('#count-down').text(startTimer);
			startTimer--;
			// when the timer reaches 0
			if (startTimer === 0) {
				$('#count-down').fadeOut(250);
				clearInterval(startInterval); 
			}
		}, 1000);
	},

	// main game loop
	start() {
		// start the game timer
		this.startGameTimer();

		// create the initial two walls
		this.createWalls();

		// set the game interval - updates every 5 milliseconds
		const interval = setInterval(() => {

 			// clear the canvas every interval
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// draw the player 
			this.player.draw(ctx);

			// checks if walls passed off the canvas
			this.wallsPassed();

			// if the walls have passed, create new ones
			if (this.walls.leftWall.hasPassed) {
				this.createWalls();
			}

			// draw both fo the walls
			this.walls.leftWall.draw(ctx);
			this.walls.rightWall.draw(ctx);

			// move both of the walls
			this.walls.leftWall.move();
			this.walls.rightWall.move();

			// creates the blocks
			this.createBlocks()

			// draw and move the blocks
			for (let i=0; i < this.blocks.length; i++) {
				const block = this.blocks[i];
				block.draw(ctx);
				block.move();

				// checks if block was collides (picked up) by the player
				this.blockCollision(block);
				// checks if the block passed off the canvas
				this.blockPassed(block);
				// checks if block needs to be removed
				this.removeBlock(block, i);
			}

			// for every 10 blocks collected, the player is invinsible for 5 seconds
			this.player.giveInvinsibility(this.blocksCollected);

			// if the right key is pressed 
			if (this.direction.rightPressed === true) {
				player.moveRight();
			} 
			// if the left key is pressed
			if (this.direction.leftPressed === true) {
				player.moveLeft();
			}
			// if the right key is pressed 
			if (this.direction.topPressed === true) {
				player.moveUp();
			} 
			// if the left key is pressed
			if (this.direction.downPressed === true) {
				player.moveDown();
			}

			// collision detection for the canvas walls
			this.canvasCollision();

			// if the player collides with the walls
			if (this.wallCollision()) {
				game.stop();
				clearInterval(interval);
			}
			
		}, 5);
	},

	// stops the game 
	stop() {
		$('.game-over-container').fadeIn(250);
		$('#final-score').html('<span>Score: </span>' + this.score);
		$('#final-blocks').html('<span>Blocks Collected: </span>' + this.blocksCollected);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},

	// increments the timer property by one every second
	startGameTimer() {
		const interval = setInterval(() => {
			this.timer++;
			console.log(this.timer);
		}, 1000);
	},

	// updates the score and the level
	updateScore() {
		// if the player passed the walls then increment the score and update UI
		if (this.walls.leftWall.hasPassed === true) {
			this.score++;
			$('#score').html('<span>Score: </span>' + this.score); 
		}	
	}, 

	// detects if the player collides into the walls
	wallCollision() {
		const leftWall = this.walls.leftWall;
		const rightWall = this.walls.rightWall;

		// if the player does not currently have the invinsibility power
		if (!this.player.isInvinsible) {	
			
			// if player collides with the left wall -> return true
			if (this.player.x - this.player.radius < leftWall.x + leftWall.width && 
				this.player.x + this.player.radius > leftWall.x &&
				this.player.y - this.player.radius < leftWall.y + leftWall.height &&
				this.player.y + this.player.radius > leftWall.y) {
				return true;
			}

			// if player collides with the right wall -> return true
			if (this.player.x - this.player.radius < rightWall.x + rightWall.width &&
				this.player.x + this.player.radius > rightWall.x &&
				this.player.y - this.player.radius < rightWall.y + rightWall.height &&
				this.player.y + this.player.radius > rightWall.y) {
				return true;
			}
		}
		// if there is not collision -> return false
		return false;
	},

	// this method checks of the walls passed off the canvas
	wallsPassed() {
		// if the walls are off the screen
		if (this.walls.leftWall.y >= canvas.height) {
			this.walls.leftWall.hasPassed = true;
			this.updateScore();
		}
	},

	// detects if the player collides with the sides of the canvas area 
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
		const leftWallWidth = Math.floor(Math.random() * (canvas.width - 60));
		const leftWall = new Wall(leftWallWidth, 0);
			
		// create the second wall 
		const rightWallWidth = (canvas.width - leftWall.width) - 60;
		const rightWall = new Wall(rightWallWidth, canvas.width);

		// add both walls to the wall properties
		this.walls = {leftWall: leftWall, rightWall: rightWall};
	}, 

	

	// instantiates a new block object every second
	createBlocks() {
		// while there are less than 2 blocks on the canvas
		while (this.blocks.length < 2) {
			// get random x and y position for the block
			const randomX = Math.floor(Math.random() * ((canvas.width-15) - 15) + 15);
			const randomY = Math.floor(Math.random() * -10); // between 0 and -10

			// create block and add it to blocks array
			const block = new Block(randomX, randomY);
			this.blocks.push(block);
		}
	},

	// checks if the player collides with one of the blocks
	blockCollision(block) {
		if (this.player.x - this.player.radius < block.x + block.width && 
			this.player.x + this.player.radius > block.x &&
			this.player.y - this.player.radius < block.y + block.height &&
			this.player.y + this.player.radius > block.y) {
			block.isCollected();
		}
	}, 

	// checks if the block passed off the canvas
	blockPassed(block) {
		if (block.y > canvas.height) {
			block.hasPassed();
		}
	},

	// checks if a block was collected or passed off the canvas
	removeBlock(block, index) {

		// if the player collected the block remove it from the array,
		// increment blocksCollected score and update UI
		if (block.collected) {
			this.blocks.splice(index, 1);
			this.blocksCollected++;
			$('#blocks-collected').html('<span>Blocks Collected: </span>' + this.blocksCollected);

		// if the block passed off the canvas, remove it from the array
		} else if (block.passed) {
			this.blocks.splice(index, 1);	
		} else {
			return;
		}
	}, 

	// takes a touch event and returns on object with the
	// x and y coordinates of the position of the touch on the canvas
	getTouchPos(canvasDom, touchEvent) {
		const rect = canvasDom.getBoundingClientRect();
	  	return {
	    	x: touchEvent.touches[0].clientX - rect.left,
	    	y: touchEvent.touches[0].clientY - rect.top
	  	};
	},

	// logic for touchstart listener
	handleTouchStart(touch) {
		// set the x and y position to the firstTouch property
		// on the player object
		this.player.firstTouch.x = touch.x;
		this.player.firstTouch.y = touch.y;
	},

	// logic for the touchmove listener
	handleTouchMove(touch) {
		// move the player by passing the touches to the touchMove
		// method on the player
		this.player.touchMove(touch);
	}, 

	// logic for touchend listener
	handleTouchEnd() {
		// clear the firstTouch property on the player object
		this.player.firstTouch.x = null;
		this.player.firstTouch.y = null;
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

	// if the help button was clicked
	if (targetID === 'how-to-play-btn') {
		$('.start-menu').slideUp(500);
		$('.how-to-play-container').delay(500).slideDown(500);
	}

	// if the back link on the help section is clicked
	if (targetID === 'back-link') {
		$('.how-to-play-container').slideUp(500);
		$('.start-menu').delay(500).slideDown(500);	
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
		game.direction.rightPressed = true;
	} 
	// if the left arrow was pressed
	if (keycode === 37) {
		game.direction.leftPressed = true;
	}
	// if the top arrow was pressed
	if (keycode === 38) {
		game.direction.topPressed = true;
	}
	// if the bottom arrow was pressed
	if (keycode === 40) {
		game.direction.downPressed = true;
	}
});

// listener for when keys are released
$(document).on('keyup', (e) => {
	const keycode = e.keyCode;

	// if the right arrow was pressed
	if (keycode === 39) {
		game.direction.rightPressed = false;
	} 
	// if the left arrow was pressed
	if (keycode === 37) {
		game.direction.leftPressed = false;
	}
	// if the top arrow was pressed
	if (keycode === 38) {
		game.direction.topPressed = false;
	}
	// if the bottom arrow was pressed
	if (keycode === 40) {
		game.direction.downPressed = false;
	}
});

// listens for the finger to first makes contact with the canvas
$(canvas).on('touchstart', (e) => {
	e.preventDefault();
	// gets x, y position of the first touch
	const touchPos = game.getTouchPos(canvas, e);
	// pass the touch to the handler method 
	game.handleTouchStart(touchPos);
});


// listens for the finger to move along the canvas
$(canvas).on('touchmove', (e) => {
	e.preventDefault();
	// gets x, y position of the touches
	const touchPos = game.getTouchPos(canvas, e);
	// pass touch to the handler method
	game.handleTouchMove(touchPos);
});

// listens for the finger to re
$(canvas).on('touchend', (e) => {
	e.preventDefault();
	// call the touchend handler
	game.handleTouchEnd();
});






	







