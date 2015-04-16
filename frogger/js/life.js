function Life (y) {
	this.y = 0 + y
	this.x = 0
}

_.extend(Life.prototype, {
	render: function (game) {
		var c = game.ctx
		var that = this

		c.save();
		c.translate( that.x * game.cellSize + (game.cellSize/2), that.y * game.cellSize + (game.cellSize/2) );
		c.rotate(Math.PI/4)
		c.fillStyle = 'red'
		c.strokeStyle = 'red'
		c.fillRect(25, 25, game.cellSize/2, game.cellSize/2)
		c.beginPath();
		c.arc(25, 3/4 * game.cellSize, game.cellSize/4, Math.PI/2, 3/2*Math.PI)
		c.fill();
		c.beginPath();
		c.arc(3/4*game.cellSize, game.cellSize/2, game.cellSize/4, Math.PI, 2*Math.PI)
		c.fill();

		c.restore();
	}
})