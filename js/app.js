
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
				// create the walls
				this.createWalls();
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

			// check if the walls have pass of the canvas
			this.wallsPassed();

			// if the player collides with the walls
			if (this.wallCollision()) {
				console.log('Game Over');
				clearInterval(interval);
			} 
			
			// update the socre and level
			this.updateScore();
			this.updateLevel();
				

		}, 5);
	},

	// stops the game 
	stop() {

	},

	// increments the score
	updateScore() {
		this.score++;	
	}, 

	// changes the level
	updateLevel() {
		// every 10 points, increase the level by one
		if (this.score % 10 === 0) {
			this.level++;
		}
	},

	// detects if the player collides into the walls
	wallCollision() {

		// if player collides with the left wall -> return true
		if (this.player.x - this.player.radius < this.leftWall.x + this.leftWall.width && 
			this.player.x + this.player.radius > this.leftWall.x &&
			this.player.y - this.player.radius < this.leftWall.y + this.leftWall.height &&
			this.player.y + this.player.radius > this.leftWall.y) {
			alert('Collided!');
			console.log('collided with left wall');
			return true; 
		}

		// if player collides with the right wall -> return true
		if (this.player.x - this.player.radius < this.rightWall.x + this.rightWall.width &&
			this.player.x + this.player.radius > this.rightWall.x &&
			this.player.y - this.player.radius < this.rightWall.y + this.rightWall.height &&
			this.player.y + this.player.radius > this.rightWall.y) {
			alert('Collided!');
			console.log('collided with right wall');
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
	}
}



// button click event listener
$('button').on('click', (e) => {
	const targetID = $(e.target).attr('id');

	// if the start game button was clicked
	if (targetID === 'start-btn') {
		game.start();
		$('.start-menu').hide();
		console.log('game started')
	}
});


// listener for when keys are pressed down
$(document).on('keydown', (e) => {
	const keycode = e.keyCode;

	// if the right arrow was pressed
	if (keycode === 39) {
		game.rightPressed = true;
		console.log('right arrow pressed');
		console.log(player.x);
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
		console.log('right arrow released');
	} 
	// if the left arrow was pressed
	if (keycode === 37) {
		game.leftPressed = false;
	}
});



	







