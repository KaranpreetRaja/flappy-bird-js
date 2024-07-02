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

// decrare pipes image
const pipesImage = new Image();
pipesImage.src = 'assets/Pipes.png';
const PIPES_SPRITE_WIDTH = 32;
const PIPES_SPRITE_HEIGHT = 48;

// pipes size on the canvas
const PIPES_CANVAS_RATIO = 1;
const PIPES_SPRITE_CANVAS_WIDTH = PIPES_SPRITE_WIDTH / PIPES_CANVAS_RATIO;
const PIPES_SPRITE_CANVAS_HEIGHT = PIPES_SPRITE_HEIGHT / PIPES_CANVAS_RATIO;
const PIPE_HOLE_WIDTH = 200;
const PIPE_OPENING_WiDTH = 17;
const PIPE_ROD_HEIGHT = 400;
const PIPE_MOUTH_START_FROM_CENTER = PIPE_HOLE_WIDTH/2;
const PIPE_ROD_START_FROM_CENTER = PIPE_HOLE_WIDTH/2 + PIPES_SPRITE_HEIGHT - PIPE_OPENING_WiDTH + PIPE_ROD_HEIGHT;

// animation constants
const LEFT_MOVEMENT_SPEED = 1;

// player object
const player = {
    x: 20,
    y: 0,
    speed: 9,
    bird_state: 0,
    jump_speed: 3,
    character_choice: 1,
};

// TODO: create a function to randomly generate pipes, currently done manually
pipes = [{
    x: 100,
    y: 300,
    color: 1,
}];


function drawPipes(){
    pipes.forEach(pipe => {
        // Decalre x and y on the image (this allows us to select the pipe color from the sprite sheet)
        let pipeImgX = PIPES_SPRITE_WIDTH * (pipe.color % 4);
        let pipeImgY = PIPES_SPRITE_HEIGHT * Math.floor(pipe.color / 4);
        
        // Draw top of pipe mouth
        ctx.drawImage(pipesImage, pipeImgX, pipeImgY + PIPE_OPENING_WiDTH, PIPES_SPRITE_WIDTH, PIPES_SPRITE_HEIGHT - PIPE_OPENING_WiDTH, pipe.x , pipe.y- PIPE_MOUTH_START_FROM_CENTER, PIPES_SPRITE_CANVAS_WIDTH, PIPES_SPRITE_CANVAS_HEIGHT);

        // Draw bottom pipe mouth
        ctx.drawImage(pipesImage, pipeImgX, pipeImgY, PIPES_SPRITE_WIDTH, PIPES_SPRITE_HEIGHT - PIPE_OPENING_WiDTH, pipe.x, pipe.y + PIPE_MOUTH_START_FROM_CENTER, PIPES_SPRITE_CANVAS_WIDTH, PIPES_SPRITE_CANVAS_HEIGHT);

        // Draw full pipe top and bottom
        ctx.drawImage(pipesImage, pipeImgX, pipeImgY + PIPE_OPENING_WiDTH, PIPES_SPRITE_WIDTH, PIPES_SPRITE_HEIGHT - PIPE_OPENING_WiDTH*2, pipe.x, pipe.y - PIPE_HOLE_WIDTH/2 - PIPES_SPRITE_HEIGHT + PIPE_OPENING_WiDTH - PIPE_ROD_HEIGHT + PIPES_SPRITE_CANVAS_HEIGHT, PIPES_SPRITE_CANVAS_WIDTH, PIPE_ROD_HEIGHT);
        ctx.drawImage(pipesImage, pipeImgX, pipeImgY + PIPE_OPENING_WiDTH, PIPES_SPRITE_WIDTH, PIPES_SPRITE_HEIGHT - PIPE_OPENING_WiDTH*2, pipe.x, pipe.y + PIPE_HOLE_WIDTH/2 + PIPES_SPRITE_CANVAS_HEIGHT, PIPES_SPRITE_CANVAS_WIDTH, PIPE_ROD_HEIGHT); 

    }   
    );  
}

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

    // draw pipes
    drawPipes();

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