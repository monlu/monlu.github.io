//Each lane in game has different properties.
function Lane (y) {
	//The lane's y position.
	this.y = y
	//The speed set for the movement of objects on each lane.
	this.speed = Math.random()*5+2
	//Alternates the direction of movement between each lane.
	this.direction = (y/2 % 1 == 0) ? 1 : -1
	//Creates six lanes of cars and where the speed determines the color of the car.
	this.cars = Array(6)
	this.carColor = ['red', 'yellow', 'blue', 'green', 'purple'][Math.floor(this.speed-2)]
}

_.extend(Lane.prototype, {
	render: function (game) {
		var that = this
		var c = game.ctx;
		this.game = game

		c.beginPath();

		//sets the color of the lane depending on it's y position.
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