//Landing on the fly gives bonus points for the game. It is a flashing circle on the lilypad.
function Fly (game) {
	this.game = game
	this.positions = [0,1,2,3,4,5,6,7,8,9]
	this.y = 0
	this.x = 1 + 2 * this.positions[Math.floor(Math.random()*10)]
	this.counter = 0
	this.width = 25
	this.height = 50
}

_.extend(Fly.prototype, {
	render: function () {
		var c = this.game.ctx
		var that = this
		this.yPos = this.y * game.cellSize
		this.xPos = this.x * game.cellSize
		c.save();
		//flashes random colors
		c.fillStyle = ['green', 'red', 'blue', 'yellow'][Math.floor(Math.random()*4)]

		c.translate( this.xPos + game.cellSize/2, this.yPos + game.cellSize/2);
		c.beginPath();
		c.arc(0,0,8, 0, 2*Math.PI)
		c.fill();
		c.restore();
	},

	//after a certain amount of time the fly will switch to another lilypad.
	changePosition: function () {
		this.counter += 1
		if (this.counter == 100) {
			this.counter = 0
			this.x = 1 + 2 * this.positions[Math.floor(Math.random()*10)]
		}
	},

	//if the frog manages to land on the fly, it will add 1000 points to the score.
	// also the fly will change location.
	grab: function (frog) {
		if (this.collide(frog)) {
			this.game.score += 1000
			this.x = 1 + 2 * this.positions[Math.floor(Math.random()*10)]
		}

	}

}, Tickable, Collidable)