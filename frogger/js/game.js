function Game () {
	this.cellSize = 50
	this.xWidth = 21
	this.yHeight = 14
	this.frog = new Frog (this.cellSize)
	this.lanes = []
	for (var i = 0; i < this.yHeight; i++) {
		this.lanes.push(new Lane (i))
	}
	this.cars = []
	this.lilipads = []
	this.logs = []
	this.lilywins = []
	this.lives = []
	
	for (var j = 0; j < 3 ; j ++) {
		this.lives.push(new Life (j))
	}

	var transportLength = 3
	var startingPos = Math.ceil(Math.random()*this.xWidth/2)* this.cellSize
	for (var j = 0; j < 13; j++) {
		var distanceVar = Math.random()*2+1.5
		if ( j == 0 ) {
			for ( var k = 0; k < 10; k++ ) {
				this.lilywins.push(new LilyWin(50 + k * this.cellSize * 2))
			}
		} else if ( j == 1 || j == 3 || j == 4) {
			for (var k = 0; k < 3; k++){
				var logDistance = k * this.cellSize * (transportLength + 3)
				this.logs.push(new Log (this.lanes[j], startingPos + logDistance, transportLength))
			}
		} else if (j == 2 || j == 5) {
			for (var k = 0; k < 3; k++) {
				var padDistance = k * this.cellSize * (transportLength + 1)
				this.logs.push(new Lilipad (this.lanes[j], startingPos + padDistance))
			}
		} 
		else if (j == 6) {}
		else {
			for (var k = 0; k < this.lanes[j].cars.length; k++){
				var carDistance = k * this.cellSize * (1.5 + distanceVar)
				this.cars.push(new Car(this.lanes[j], startingPos + carDistance ))
			}
		}


		this.fly = new Fly(this)
		this.score = 0
		this.scoreCeil = this.yHeight
	}
	this.river = {
		xPos : 0,
		yPos : 1,
		width : 1050,
		height : 250,
	}

	

	// this.lilipad = new Lilipad (this.lanes[5])
	// this.log = new Log (this.lanes[4], 11)
}

_.extend(Game.prototype, {
	ready: function () {
		var that = this
		this.canvas = document.getElementById('game');
		this.ctx = this.canvas.getContext('2d')
		this.render();

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

	renderScore: function () {
		var c = this.ctx
		var score = "Score: "+ this.score

		c.beginPath();
		c.font      = "24px 'Press Start 2P', cursive";
		c.fillStyle = 'white'
		c.fillText(score, 0, 25)
		c.stroke();
	},

	checkScore: function () {
		var game = this
		var ceil = this.scoreCeil
		var frog = this.frog
		if ( frog.y < ceil -1) {
			this.score += 10
			this.scoreCeil -= 1
		} else if ( ceil == 1 && frog.transporting == true) {
			this.score += 30
			this.scoreCeil = this.yHeight
			setTimeout (function () {
				frog.x = 10
				frog.y = 13
				frog.xPos = frog.x * game.cellSize
				frog.yPos = frog.y * game.cellSize
			}, 90)
			
		} else if ( ceil == 14) {
			frog.unkillable = false
		}
	},

	gameOver: function () {
		var game = this
		var c = this.ctx
		var lives = this.lives
		var message = "Game Over"
		var finalScore = "Final Score: "+ this.score
		var width = this.xWidth * this.cellSize
		var height = this.yHeight * this.cellSize
		setTimeout(function(){
			// debugger
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
		window.interval = setInterval(function(){
			if (lives.length <= 0) {
				game.gameOver();
			}
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

			if (frog.collide( river ) && frog.transporting == false) {
				frog.dead();
			}
			_.each(lives, function (life) {
				life.render(game);
			})
			game.checkScore();
			game.renderScore();
				// game.render(game.ctx);
		}, 30)

	},

	render: function () {
		var c = this.ctx;
		var game = this

		// c.fillStyle = 'rgba(31, 31, 31, 1)'
		// c.strokeStyle = '#fff';
		// c.lineWidth = 1;
		// c.fillRect(0,0, 1050, 700);

		this.gameInterval();
		
	}
})