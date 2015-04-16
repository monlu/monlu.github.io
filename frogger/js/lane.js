function Lane (y) {
	this.y = y
	this.speed = Math.random()*5+2
	this.direction = (y/2 % 1 == 0) ? 1 : -1
	this.cars = Array(6)
	this.carColor = ['red', 'yellow', 'blue', 'green', 'purple'][Math.floor(this.speed-2)]
}

_.extend(Lane.prototype, {
	render: function (game) {
		var that = this
		var c = game.ctx;
		this.game = game

		c.beginPath();
		if (that.y == 13 || that.y == 6)  {
			c.fillStyle = 'grey'
		}  else if (that.y >= 0 && that.y < 6 ) {
			c.fillStyle = '#3A2DC4'
		}
		else {
			c.fillStyle = 'rgba(31, 31, 31, 1)'
		}

		c.fillRect(0, this.y*game.cellSize, this.game.canvas.width, game.cellSize);
		c.stroke();

	}
})