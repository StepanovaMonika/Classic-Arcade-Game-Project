// Global variables
let score = 0;
let textScore = document.getElementById('score');
let winScreen = document.getElementById('winScreen');
let restartBtn = document.getElementById('restartBtn');
let speedIndex = 0;

// Enemies our player must avoid
let Enemy = class {
    // The image/sprite for our enemies,
    // Creating an enemy
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiple any movement by the dt parameter
    // Ensuring the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    checkCollision(this);

    // Check if the enemy is at the end of the screen 
    if (this.x >= 510) {
        this.x = 0;
        this.speed = 200 * Math.random() + 50 + speedIndex;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

let checkCollision = function(enemy) {
    // Check the player and enemies for a collision 
    if(player.x >= enemy.x - 70 && player.x <= enemy.x + 75 && player.y >= enemy.y - 40 && player.y <= enemy.y + 50) {
        player.x = 200;
        player.y = 400;
        score = 0;
        speedIndex = 0;
        textScore.textContent = score;
    } 
};


// Creating player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = class {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';;
    }
};

Player.prototype.update = function(dt) {
    // Checking winning top position
    if (this.y < -10) {
        score++;
        textScore.textContent = score;
        if(score === 15) {
            winScreen.style.display = "block";
        };
        speedIndex += 10;
        this.x = 200;
        this.y = 400;
    }

    // Right Border
    if (this.x > 400) {
        this.x = 400;
    }

    // Left border
    if (this.x < 0) {
        this.x = 0;
    }

    // Bottom border
    if (this.y > 400) {
        this.y = 400;
    }
};

// Draw the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Checking arrow keys for movement
Player.prototype.handleInput = function(keyPressed) {
    switch(keyPressed){
        case "left":
            this.x = this.x - 100;
            break;
        case "right":
            this.x = this.x + 100;
            break;
        case "up":
            this.y = this.y - 82;
            break;
        case "down":
            this.y = this.y + 82;
            break;
    }
};


// Instantiate enemy objects
let enemy1 = new Enemy(0,62, 200 * Math.random() + 50);
let enemy2 = new Enemy(0,144, 200 * Math.random() + 50);
let enemy3 = new Enemy(0,226, 200 * Math.random() + 50);
let allEnemies = [enemy1,enemy2,enemy3];

// Place the player object on the start position
let player = new Player(200,400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. 
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

restartBtn.addEventListener("click", function(){
    winScreen.style.display = "none";
    score = 0;
    textScore.textContent = score;
    speedInxed = 0;
})