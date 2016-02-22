// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// princess image
var princessReady = false;
var princessImage = new Image();
princessImage.onload = function () {
	princessReady = true;
};
princessImage.src = "images/princess.png";

// stone image
var stoneReady = false;
var stoneImage = new Image();
stoneImage.onload = function () {
	stoneReady = true;
};
stoneImage.src = "images/stone.png";

//monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";
// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};
var monster = {};
var princess = {};
var stone = {};
var arrStone = [];
var numStone = 5;
var princessesCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a princess
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the princess somewhere on the screen randomly
	princess.x = 32 + (Math.random() * (canvas.width - 100));
	princess.y = 32 + (Math.random() * (canvas.height - 100));
	monster.x = 32 + (Math.random() * (canvas.width - 100));
	monster.y = 32 + (Math.random() * (canvas.height - 100));

	//stone.x = 32 + (Math.random() * (canvas.width - 100));
	//stone.y = 32 + (Math.random() * (canvas.height - 100));

	/*if (
		stone.x <= (princess.x + 16)
		&& princess.x <= (stone.x + 16)
		&& stone.y <= (princess.y + 16)
		&& princess.y <= (stone.y + 32)
	) {
		stone.x = 32 + (Math.random() * (canvas.width - 80));
		stone.y = 32 + (Math.random() * (canvas.height - 80));
	}*/
	arrStone=[];
	var pushStone = 0;
	while(pushStone < numStone){
			stone= {}
			stone.x = 32 + (Math.random() * (canvas.width - 80));
			stone.y = 32 + (Math.random() * (canvas.height - 80));
			pushStone++;

			if(hero.x <= (stone.x + 16)
			&& stone.x <= (hero.x + 16)
			&& hero.y <= (stone.y + 16)
			&& stone.y <= (hero.y + 32) || stone.x <= (princess.x + 16)
			&& princess.x <= (stone.x + 16)
			&& stone.y <= (princess.y + 16)
			&& princess.y <= (stone.y + 32)){
				pushStone--;
			}else{
				arrStone.push(stone);
			}
	}

};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		if(hero.y<=34 ||(stone.x <= (hero.x + 32)
			&& hero.x <= (stone.x + 32)
			&& stone.y <= (hero.y + 32)
			&& hero.y <= (stone.y + 32))){
				hero.y += 1
		}else{
			hero.y -= hero.speed * modifier;
		}
	}
	if (40 in keysDown) { // Player holding down
		if(hero.y >=415 || (stone.x <= (hero.x + 32)
			&& hero.x <= (stone.x + 32)
			&& stone.y <= (hero.y + 32)
			&& hero.y <= (stone.y + 32))){
				hero.y -= 1
		}else{
			hero.y += hero.speed * modifier;
		}
	}
	if (37 in keysDown) { // Player holding left
		if(hero.x<=32 || (stone.x <= (hero.x + 32)
			&& hero.x <= (stone.x + 32)
			&& stone.y <= (hero.y + 32)
			&& hero.y <= (stone.y + 32))){
				hero.y += 1
		}else{
			hero.x -= hero.speed * modifier;
		}
	}
	if (39 in keysDown) { // Player holding right
		if(hero.x>=455 || (stone.x <= (hero.x + 32)
			&& hero.x <= (stone.x + 32)
			&& stone.y <= (hero.y + 32)
			&& hero.y <= (stone.y + 32))){
				hero.y += 1
		}else{
			hero.x += hero.speed * modifier;
		}
	}

	if (
		hero.x <= (monster.x + 16)
		&& monster.x <= (hero.x + 16)
		&& hero.y <= (monster.y + 16)
		&& monster.y <= (hero.y + 32)
	) {
		alert("perdiste");
		location.reload();
	}
	// Are they touching?
	if (
		hero.x <= (princess.x + 16)
		&& princess.x <= (hero.x + 16)
		&& hero.y <= (princess.y + 16)
		&& princess.y <= (hero.y + 32)
	) {
		++princessesCaught;
	{
		if (princessesCaught <= 3){
		 		numStone= 4;
			}else if (princessesCaught > 3 && princessesCaught <= 8) {
				numStone = 8;
			}else if (princessesCaught > 8 && princessesCaught <= 12){
				numStone = 12;
			}else{
				numStone = 15;
			}
		}
		reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (princessReady) {
		ctx.drawImage(princessImage, princess.x, princess.y);
	}

	if (stoneReady) {
    ctx.drawImage(stoneImage,stone.x, stone.y);
	}

	if (monsterReady) {
    ctx.drawImage(monsterImage,monster.x, monster.y);
	}
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Princesses caught: " + princessesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
};

// Let's play this game!
reset();
var then = Date.now();
//The setInterval() method will wait a specified number of milliseconds, and then execute a specified function, and it will continue to execute the function, once at every given time-interval.
//Syntax: setInterval("javascript function",milliseconds);
setInterval(main, 1); // Execute as fast as possible
