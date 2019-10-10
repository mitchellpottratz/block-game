
const gamepads = {};


// gamepad connected event listener
window.addEventListener('gamepadconnected', (e) => {
	gamepadHandler(e, true);
});

// gamepad disconnected event listener
window.addEventListener('gamepaddisconnected', (e) => {
	gamepadHandler(e, false);
});


function buttonPressed(b) {
	if (typeof(b) == "object") {
		return b.pressed;
	}
		return b == 1.0;
} 

function gamepadHandler(event, connected) {
	const gamepad = event.gamepad;

	if (connected) {
		console.log('gamepad connected');
		gamepads[gamepad.index] = gamepad;
	} else {
		console.log('gamepad disconnected');
		delete gamepads[gamepad.index]; 
	}
}


function gameLoop() {
	const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
  	if (!gamepads) {
    	return;
  	}

  	const gamepad = gamepads[0];

	// move up
	if (buttonPressed(gamepad.buttons[12])) {
		console.log('up')
		game.player.y -= 1.5;
		console.log('right')
	}
	// move down
	else if (buttonPressed(gamepad.buttons[13])) {
		game.player.y += 1.5;
	}
	// move right
	if (buttonPressed(gamepad.buttons[15])) {
		game.player.x += 1.5;
	}
	// move left 
	else if (buttonPressed(gamepad.buttons[14])) {
		game.player.x -= 1.5;
	}
  }





