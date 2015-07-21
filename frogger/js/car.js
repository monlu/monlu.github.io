//The car model for the road lanes.
function Car (lane, xPos) {
	this.speed = lane.speed
	this.direction = lane.direction
	this.y = lane.y
	this.xPos = xPos
	this.width = 75
	this.height = 25
	this.color = lane.carColor

}

_.extend(Car.prototype, {
	render: function(game) {
		var c = game.ctx
		var that = this
		this.yPos = this.y * game.cellSize

		c.beginPath();
		c.save();
		//The car is rendered by creating two vertical rectangles and superimposing a horizontal one over them.
		c.translate( this.xPos, this.y * game.cellSize + (game.cellSize/2))
		c.fillStyle = 'grey'
		c.fillRect(5, -game.cellSize/3, 15, game.cellSize*2/3);
		c.fillRect(1.5 * game.cellSize - 20, -game.cellSize/3, 15, game.cellSize*2/3);

		c.fillStyle = this.color
		c.fillRect(0, -game.cellSize/4, game.cellSize*1.5, game.cellSize/2);
		
		c.stroke();
		c.restore();

	}
}, Tickable, Movable, Wrappable)