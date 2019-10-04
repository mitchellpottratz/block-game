# block-game



# Game - scoring and levels
- Each time the player goes through a space in the wall, their score goes up by one point.
- The first level goes up after the player reaches a score of 10. After that, each level goes up by doing this: 10 + (current  level * 5)
- Game ends after a player touches a wall.

# Player - ball
- The player is a ball.
- They will be roughly 5% - 10% of the screen size.
- Have the ability to move left and right using the right and left arrow key.
- The vertical position of the player does not change.
- When the player touches a wall, they lose.
- If they go in between the space in the wall, then their score goes up by one.
- The player needs to be able to go fast enough left and right to be able to make it in through the space in the walls.

# Wall - obstacles
- The obstacles in the game consist of two walls aligned horizontal with a space  roughly twice the size of the player.
- The walls will move towards the player, but the game will look like the player is moving. 
- The walls speed will increase when the levels increase.
- The space in the walls will be calculated by doing:
- wallOne = Math.floor(Math.random(90)*90);
- wallTwo = (100 - wallOne) - 10;

![Wireframe 1](/wireframes/IMG_5486.HEIC?raw=true)

![Wireframe 2](/wireframes/IMG_8362.HEIC?raw=true)
