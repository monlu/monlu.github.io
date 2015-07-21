// The basic properties of a frog.
var Frog = function(cellSize){
    // The starting position of the frog.
    this.x = 10;
    this.y = 13;
    this.xPos = this.x * cellSize
    this.yPos = this.y * cellSize

    //size recorded for collision detection.
    this.width = 36
    this.height = 30

    //direction the frog is facing.
    this.direction = Math.PI;
    this.cellSize = cellSize;

    //booleans to see if frog is standing on an object in the river that is not lethal.
    this.transporting = false;
    this.unkillable = false
}

_.extend(Frog.prototype, {
    render: function(ctx){
        var c = ctx;
        //The coordinates of the frog image.
        var head = [2,5];
        var frog = [
            [2,5], [-2,5], [-2,4], [-3,4], 
            [-3,2], [-4,2], [-4,5], [-5,5], 
            [-5,4], [-6,4], [-6,3], [-5,3], 
            [-5,1], [-3,1], [-3,0], [-5, 0], 
            [-5,-2], [-6, -2], [-6, -3], [-5, -3], 
            [-5, -4], [-4, -4], [-4, -1], [-3, -1], 
            [-3, -2], [-2, -2],[-2, -3], [2,-3], 
            [2,-2 ], [3,-2], [3,-1], [4,-1], 
            [4,-4 ], [5,-4], [5,-3], [6,-3], 
            [6,-2 ], [5,-2], [5,0], [3,0], [3,1],
            [5,1], [5,3], [6,3], [6,4], [5,4], 
            [5,5], [4,5], [4,2], [3,2], [3,4], 
            [2,4], [2,5], [-2,5]
        ];

        c.strokeStyle = 'darkgreen';
        c.fillStyle = 'chartreuse';
        c.lineWidth = 3;
        c.save();
        c.translate( this.x * this.cellSize + (this.cellSize/2), this.y * this.cellSize + (this.cellSize/2) );
        c.rotate(this.direction);
        c.scale(3,3);
        c.beginPath();

    c.moveTo(head[0], head[1]); // go to head
    _.each(frog,function (coord, i) {
      c.lineTo(coord[0], coord[1]);
    });
    c.stroke();
    c.fill();

    c.restore();
    },

    //if frog dies, resets to starting location and removes a life.
    dead: function() {
        var game = window.game
        this.x = 10;
        this.y = 13;
        this.xPos = this.x * this.cellSize
        this.yPos = this.y * this.cellSize
        this.direction = Math.PI;
        game.scoreCeil = game.yHeight
        game.lives.splice((game.lives.length - 1), 1)
        console.log("life was lost")
    },

    unrender: function(bgColor) {
        var c = ctx;
        this.bgColor = bgColor;

        c.fillRect(this.bgColor);
    },

    //moves the frog, also prevents the frog from moving off screen.
    moveUp: function() { 
        if (this.y > 0) { 
            this.y -= 1; this.direction = Math.PI; this.yPos = this.y * this.cellSize };
    },

    moveDown: function() { 
        if (this.y < 13) { this.y += 1; this.direction = 0; this.yPos = this.y * this.cellSize };
    },

    moveLeft: function() { 
        if (this.x > 0) { this.x -= 1 ; this.direction = Math.PI / 2; this.xPos = this.x * this.cellSize };
    },
    
    moveRight: function() { 
        if (this.x < 20 ) { this.x += 1 ; this.direction = Math.PI / -2; this.xPos = this.x * this.cellSize };
    },

    //moves the frog when it is standing on a lilypad or log.
    transport: function (obj) {
        if (this.collide(obj) == true) {
            this.x = (this.x*this.cellSize + obj.direction * obj.speed)/this.cellSize
            this.xPos = this.x * this.cellSize
            //if the frog is moved off screen by these objects, it dies.
            if (this.x < 0 || this.x > 20) {
                this.dead();
            }
            // console.log("collision detected", this.x, this.xPos)
        }
    },

    invincible: function () {
        var that = this
        this.unkillable = true
        setTimeout(function () {that.unkillable = false}, 3000)
    }
}, Tickable, Collidable)