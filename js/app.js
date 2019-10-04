
// get the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const game = {
	score: 0,
	level: 1,
	player: player, // holds the player object
	currentWalls: [], // holds wall objects after they are instantiated
	upcomingWalls: [], // ^same^
	rightPressed: false, // if the right arrow key is pressed
	leftPressed: false, // if the left arrow key is pressed


	// main game loop
	start() {
		// set the initial x and y positions of the player
		this.player.x = canvas.width / 2;
		this.player.y = canvas.height - 30;

		// set the game interval - updates every 10 milliseconds
		const interval = setInterval(() => {
			// clear the canvas every interval
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// draw the player 
			this.player.draw(ctx);
		
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
				

		}, 10);
	},

	// stops the game 
	stop() {

	},

	updateScore() {

	}, 

	updateLevel() {

	},

	// detects if the player collides into the walls
	wallCollison() {

	},

	// detects if the player collides with the sides
	// of the canvas area 
	canvasCollision() {
		// if player touches left wall || player touches right wall
		if (this.player.x - this.player.speedX < this.player.radius) {
			this.player.x += 3;
			return;
		}
		if (this.player.x + this.player.speedX > canvas.width - this.player.radius) {
			this.player.x -= 3;
			return;
		}
	},

	// instantiates two wall objects and store them in the array
	createWalls() {

	}
}



// button click event listener
$('button').on('click', (e) => {
	const targetID = $(e.target).attr('id');

	// if the start game button was clicked
	if (targetID === 'start-game') {
		game.start();
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



	







