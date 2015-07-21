// The umbrella module for movement and keeping objects on the screen.
var Tickable = {
	tick: function () {
		if (this.move) { this.move(); };
		if (this.wrap) { this.wrap(); };
	}
}

// Allows object to move as the game is being rendered.
var Movable = {
  move: function () {
    this.xPos += this.direction * this.speed;
  }
};

// The object will reappear on the opposite side once it leaves the screen.
var Wrappable = {
  wrap: function () {
  	var game = window.game
    var width = game.canvas.width;
    var x = this.xPos
    //if the xPosition of the object is greater than the width of the game, 
    // it transports it to otherside 2.5 * cellsize removed fromt he screen.
    if (x > width + game.cellSize) {
    	this.xPos = -game.cellSize * 2.5
    } else if ( x < -game.cellSize * 2.5 ) {
    	this.xPos = width + game.cellSize
    } 
  }
};

// Collision detection using rectangle method.
var Collidable = {
  collide: function (otherObj) {

    if (this.xPos < otherObj.xPos + otherObj.width &&
       this.xPos + this.width > otherObj.xPos &&
       this.yPos < otherObj.yPos + otherObj.height &&
       this.height + this.yPos > otherObj.yPos) {
        return true
    } else { return false }
  }
}

//Non lethal objects once collided with, will transport the frog.
var Sticky = {
  stick: function (frog) {
    if (this.collide(frog) == true) {
      frog.transporting = true
    } else {
      setTimeout(function () {
        frog.transporting =false
      }, 30)
    }
  }
}
