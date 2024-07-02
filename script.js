// Canvas setup
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 512;
const CANVAS_HEIGHT = canvas.height = 512;

// Bird image setup
const birdImage = new Image();
birdImage.src = 'assets/Birds.png';
birdSpriteWidth = 1441;
birdSpriteHeight = 1079;

// Bird size on the canvas
birdCanvasRatio = 18;
birdSpriteCanvasWidth = birdSpriteWidth / birdCanvasRatio;
birdSpriteCanvasHeight = birdSpriteHeight / birdCanvasRatio;

// background image
const background = new Image();
background.src = 'assets/Background.png';
let background1X = 0;
let background2X = CANVAS_WIDTH;


// player object
const player = {
    x: 20,
    y: 0,
    speed: 9,
    bird_state: 0,
    jump_speed: 3,
    character_choice: 1,
};

// main loop to animate the game
function animate(){

    // clear the canvas
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT)

    // Declare x and y on the image for which frame of the birds animation we are currently in (this allows us to select the bird color from the sprite sheet)
    birdFrameX = (player.bird_state + player.character_choice * 8) % 4;
    birdFrameY = Math.floor((player.bird_state + player.character_choice * 8) / 4);

    // draw background
    ctx.drawImage(background, background1X, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(background, background2X, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // draw bird
    ctx.drawImage(birdImage, birdFrameX * birdSpriteWidth + 350, birdFrameY * birdSpriteHeight + 340, birdSpriteWidth, birdSpriteHeight, player.x, player.y, birdSpriteCanvasWidth, birdSpriteCanvasHeight);
    
    // request next animation frame
    requestAnimationFrame(animate);

};

// animate background moving
setInterval(() => {
    background1X -= LEFT_MOVEMENT_SPEED;
    background2X -= LEFT_MOVEMENT_SPEED;

    if (background1X <= -CANVAS_WIDTH) {
        background1X = CANVAS_WIDTH;
    }

    if (background2X <= -CANVAS_WIDTH) {
        background2X = CANVAS_WIDTH;
    }
}, 10);

// animate bird flapping by changing bird state/frame when animation sequence is triggered (bird state is set to 1)
function animateBird(){
    console.log("bird state: " + player.bird_state);
    if (player.bird_state != 0) {
        player.bird_state++;
        player.jump_speed = -3 ;
        console.log("player not equal to 0");
    }

    if (player.bird_state == 7 ) {
        player.bird_state = 0;
        player.jump_speed = 3;
        console.log("player greater than 7");
    }

    setTimeout(animateBird, 100);
}
animateBird();


// animate gravity for the bird
setInterval(() => {
    player.y += player.jump_speed;
}, 10);

// add event listener for space key to make bird jump, when triggered change bird state to 1 (starting animation sequence)
document.addEventListener('keydown', (event) => {
    if(event.key === ' '){
        player.bird_state = 1;
    }
});


animate();