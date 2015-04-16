function Lilipad (lane, xPos) {
	this.y = lane.y
	this.speed = lane.speed
	this.direction = -1
	this.xPos = xPos
	this.attached = false
	this.lilipadCount = 3
	this.height = 50
	this.width = (this.lilipadCount -0.5)* 50
}

_.extend(Lilipad.prototype, {
	render: function (game) {
		var c = game.ctx
		var that = this
		this.yPos = this.y * game.cellSize
		c.save();
		c.fillStyle = 'green'

		c.translate( this.xPos + game.cellSize/4, this.yPos + game.cellSize/2);
		for (var i = 0; i < this.lilipadCount; i++) {
			c.beginPath();
			c.arc(0+i*game.cellSize,0,20, (4/3)*Math.PI, (1/3)*Math.PI)
			c.fill();
			c.beginPath();
			c.arc(0+i*game.cellSize,0,20, (1/6)*Math.PI, (7/6)*Math.PI)
			c.fill();
		}
		c.restore();

	}
}, Tickable, Movable, Wrappable, Collidable, Sticky)