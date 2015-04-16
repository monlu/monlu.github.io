var Tickable = {
	tick: function () {
		if (this.move) { this.move(); };
		if (this.wrap) { this.wrap(); };
	}
}

var Movable = {
  move: function () {
    this.xPos += this.direction * this.speed;
  }
};

var Wrappable = {
  wrap: function () {
  	var game = window.game
    var width = game.canvas.width;
    var x = this.xPos
    if (x > width + game.cellSize) {
    	this.xPos = -game.cellSize * 2.5
    } else if ( x < -game.cellSize * 2.5 ) {
    	this.xPos = width + game.cellSize
    } 
  }
};

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
