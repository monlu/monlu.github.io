function LilyWin (xPos) {
	this.y = 0
	this.speed = 0
	this.direction = 0
	this.xPos = xPos
	this.height = 50
	this.width = 25
}

_.extend(LilyWin.prototype, {
	render: function (game) {
		var c = game.ctx
		var that = this
		this.yPos = this.y * game.cellSize
		c.save();
		c.fillStyle = 'green'

		c.translate( this.xPos + game.cellSize/2, this.yPos + game.cellSize/2);
		c.beginPath();
		c.arc(0,0,20, (4/3)*Math.PI, (1/3)*Math.PI)
		c.fill();
		c.beginPath();
		c.arc(0,0,20, (1/6)*Math.PI, (7/6)*Math.PI)
		c.fill();
		c.restore();

	}
}, Tickable, Collidable, Sticky)