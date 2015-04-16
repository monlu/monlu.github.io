function Log (lane, xPos, length) {
	this.y = lane.y
	this.speed = lane.speed
	this.direction = 1
	this.xPos = xPos
	this.height = 50
	this.width = length * 50
	this.attached = false
}

_.extend(Log.prototype, {
	render: function (game) {
		var c = game.ctx
		var that = this
		var width = this.width
		this.yPos = this.y * game.cellSize

		c.save();

		c.translate( this.xPos + game.cellSize/2, this.yPos + game.cellSize/2);
		c.fillStyle = 'brown'
		c.beginPath();
		c.scale(0.5, 1)
		c.arc(0,0,23, 0, 2*Math.PI)
		c.fill();
		c.fillRect(0, -23, width * 2, 46)
		c.beginPath();
		c.fillStyle = 'tan'
		c.arc( width * 2 , 0, 23, 0, 2*Math.PI)
		c.fill();
		c.restore();

	}
}, Tickable, Movable, Wrappable, Collidable, Sticky)