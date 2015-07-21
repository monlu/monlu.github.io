function Game () {
	//Basic mapping of the game. It is based on a 21x14 grid where each square is 50x50 pixels.
	this.cellSize = 50
	this.xWidth = 21
	this.yHeight = 14

	//Create a new Frog object.
	this.frog = new Frog (this.cellSize)

	//Adds 3 lives at the start of the game.
	this.lives = []
	for (var j = 0; j < 3 ; j ++) {
		this.lives.push(new Life (j))
	}

	//Tracks the score and generates the fly for bonus points.
	this.fly = new Fly(this)
	this.score = 0
	//the scoreCeil exists to register points when the frog progresses further in the game.
	this.scoreCeil = this.yHeight

	//the river that is generated. landing in this area results in a loss of a life.
	this.river = {
		xPos : 0,
		yPos : 1,
		width : 1050,
		height : 250,
	}
}

//Functions added to the game prototype.
_.extend(Game.prototype, {
	//Generates the game.
	generate: function () {
		
		//Since the height of the grid is 14, there are 14 lanes.
		this.lanes = []
		for (var i = 0; i < this.yHeight; i++) {
			this.lanes.push(new Lane (i))
		}

		//Array storage for other models that exist in the game.
		this.cars = []
		this.lilipads = []
		this.logs = []
		this.lilywins = []
		

		//Base length of the logs generated in game.
		var transportLength = 3

		//Generates a random starting position for each model (Log, Lilypad, Car) on the left half of the screen.
		var startingPos = Math.ceil(Math.random()*this.xWidth/2)* this.cellSize
		//iterating over each lane to generate the appropriate models.
		for (var j = 0; j < 13; j++) {
			//random distance variable generated for cars
			var distanceVar = Math.random()*2+1.5

			//Landing on lilywins are the objective of the game. They are on the last lane.
			if ( j == 0 ) {
				for ( var k = 0; k < 10; k++ ) {
					this.lilywins.push(new LilyWin(50 + k * this.cellSize * 2))
				}
			//Logs are generated on lines 1,3,4
			} else if ( j == 1 || j == 3 || j == 4) {
				for (var k = 0; k < 3; k++){
					//sets the distance of each log relative to the first log generated on each lane.
					var logDistance = k * this.cellSize * (transportLength + 3)
					this.logs.push(new Log (this.lanes[j], startingPos + logDistance, transportLength))
				}
			//Lilypads are generated on lines 2,5
			} else if (j == 2 || j == 5) {
				for (var k = 0; k < 3; k++) {
					var padDistance = k * this.cellSize * (transportLength + 1)
					this.logs.push(new Lilipad (this.lanes[j], startingPos + padDistance))
				}
			} 
			//empty lane
			else if (j == 6) {}

			//Renders cars on the remaining lanes.
			else {
				for (var k = 0; k < this.lanes[j].cars.length; k++){


					var carDistance = k * this.cellSize * (1.5 + distanceVar)
					this.cars.push(new Car(this.lanes[j], startingPos + carDistance ))
				}
			}

		}
	},
	ready: function () {
		var that = this
		this.generate();
		//grabs the canvas element in the html document and renders the game.
		this.canvas = document.getElementById('game');
		this.ctx = this.canvas.getContext('2d')
		this.render();

		//switches for frog movement
		window.onkeydown = function(event) {
			switch(event.keyCode) {
				case 37:
					that.frog.moveLeft();
					// console.log(that.frog.x, that.frog.y, that.frog.xPos, that.frog.yPos)
					// that.render(that.ctx);
					return false
				case 38:
					that.frog.moveUp();
					// console.log(that.frog.x, that.frog.y, that.frog.xPos, that.frog.yPos)
					// that.render(that.ctx);
					return false;
				case 39:
					that.frog.moveRight();
					// console.log(that.frog.x, that.frog.y, that.frog.xPos, that.frog.yPos)
					// that.render(that.ctx)
					return false;
				case 40:
					that.frog.moveDown();
					// console.log(that.frog.x, that.frog.y, that.frog.xPos, that.frog.yPos)
					// that.render(that.ctx);
					return false;
			}
		}
	},

	//Renders the score on the topleft.
	renderScore: function () {
		var c = this.ctx
		var score = "Score: "+ this.score

		c.beginPath();
		c.font      = "24px 'Press Start 2P', cursive";
		c.fillStyle = 'white'
		c.fillText(score, 0, 25)
		c.stroke();
	},

	//checks the score while the game is rendering.
	checkScore: function () {
		var game = this
		var ceil = this.scoreCeil
		var frog = this.frog
		//As long as the frog position is below the score ceiling, no new points will be generated.
		if ( frog.y < ceil -1) {
			this.score += 10
			this.scoreCeil -= 1
		} else if ( ceil == 1 && frog.transporting == true) {
		//If the frog manages to land on the final lilypad (lilywin) 
		// it will reset the score ceiling and the frog to the starting position.
			this.score += 30
			setTimeout (function () {
				frog.x = 10
				frog.y = 13
				frog.xPos = frog.x * game.cellSize
				frog.yPos = frog.y * game.cellSize
				game.scoreCeil = game.yHeight
				game.generate();
				clearInterval(window.interval)
				game.render();
			}, 90)
		
		}
	},


	//Renders the game over screen when there are 0 lives left.
	gameOver: function () {
		var game = this
		var c = this.ctx
		var lives = this.lives
		var message = "Game Over"
		var finalScore = "Final Score: "+ this.score
		var width = this.xWidth * this.cellSize
		var height = this.yHeight * this.cellSize
		setTimeout(function(){
			c.beginPath();
			c.fillStyle = 'rgba(31, 31, 31, 1)'
			c.lineWidth = 1;
			c.fillRect(0,0, width, height);
			c.save();
			c.translate(width/2, height/2)
			c.font = "48px 'Press Start 2P', cursive";
			c.textAlign = "center";
			c.fillStyle = '#fff';
			c.fillText(message, 0, 0);
			c.fillText(finalScore, 0, 75);
			c.restore();
		}, 30)
		clearInterval(window.interval)
	},

	//Stores all the models to variables and renders the game.
	gameInterval: function (){
		var game = this
		var cars = this.cars
		var frog = this.frog
		var lilipads = this.lilipads
		var logs = this.logs
		var lilywins = this.lilywins
		var lives = this.lives
		var river = this.river
		var fly = this.fly
		// Renders all the models on screen in a 30 ms interval.
		window.interval = setInterval(function(){
			if (lives.length <= 0) {
				game.gameOver();
			}
			//Applies the proper modules to each object and renders it.
			_.each(game.lanes, function (lane) {
				lane.render(game)
			});
			_.each(logs, function (log) {
				log.tick();
				log.stick(frog);
				frog.transport(log)
				log.render(game);
			})
			_.each(lilipads, function (lilipad) {
				lilipad.tick();
				lilipad.stick(frog);
				frog.transport(lilipad)
				lilipad.render(game);
			})
			_.each(lilywins, function (lilipad) {
				lilipad.stick(frog);
				frog.transport(lilipad)
				lilipad.render(game);
			})
			fly.render();
			fly.changePosition();
			fly.grab(frog)
			frog.tick();
			frog.render(game.ctx)
			_.each(cars, function (car) {
				car.tick();
				car.render(game);
				if (frog.collide(car)) {
					frog.dead(); 
				}
			})
			//kills the frog if it lands in the river.
			if (frog.collide( river ) && frog.transporting == false) {
				frog.dead();
			}
			_.each(lives, function (life) {
				life.render(game);
			})
			game.checkScore();
			game.renderScore();
		}, 30)

	},

	render: function () {
		var c = this.ctx;
		var game = this

		this.gameInterval();
		
	}
})