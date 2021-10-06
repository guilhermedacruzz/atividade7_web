class Cell {
    constructor(i, f) {
        this.i = i;
        this.f = f;
        this.visited = false;
        //            top   right  bottom  left
        this.walls = [true, true,  true, true];
    }

    index(i, f, rows, cols) {

        if(i < 0 || f < 0 || i > cols - 1 || f > rows - 1) {
            return -1;
        }

        return i + f * cols;
    }

    checkNeighbors(grid, rows, cols) {
        var neighbors = [];

        var top = grid[this.index(this.i, this.f - 1, rows, cols)];
        var right = grid[this.index(this.i + 1, this.f, rows, cols)];
        var bottom = grid[this.index(this.i, this.f + 1, rows, cols)];
        var left = grid[this.index(this.i - 1, this.f, rows, cols)];

        if(top && !top.visited) {
            neighbors.push(top);
        }

        if(right && !right.visited) {
            neighbors.push(right);
        }

        if(bottom && !bottom.visited) {
            neighbors.push(bottom);
        }

        if(left && !left.visited) {
            neighbors.push(left);
        }

        if(neighbors.length > 0) {
            var r = Math.floor(Math.random() * neighbors.length);
            return neighbors[r];
        } else {
            return undefined;
        }
    }

    show(context, scale) {
        var x = this.i * scale; 
        var y = this.f * scale;

        if(this.walls[0]) {
            context.moveTo(x, y);
            context.lineTo(x + scale, y); 
        }

        if(this.walls[1]) {
            context.moveTo(x + scale, y);
            context.lineTo(x + scale, y + scale);
        }

        if(this.walls[2]) {
            context.moveTo(x + scale, y + scale);
            context.lineTo(x, y + scale);
        }

        if(this.walls[3]) {
            context.moveTo(x, y + scale);
            context.lineTo(x, y);
        }

        if(this.visited) {
            context.fillStyle="#7F7F00";
            context.fillRect(x, y, scale, scale);
        }
    }
}

class MyMaze {

    constructor(width, height, scale, idCanvas) {
        this.width = width;
        this.height = height;
        this.scale = scale;

        this.rows = height / scale;
        this.cols = width / scale;

        this.grid = [];

        for(let i = 0; i < this.rows; i++) {
            for(let f = 0; f < this.cols; f++) {
                this.grid.push(new Cell(f, i));
            }
        }

        this.current = this.grid[50];

        this.canvas = document.getElementById(idCanvas);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext("2d");

        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
    }

    stop() {
        this.isRunning = false;
    }

    run() {
        if(this.isRunning) {
            this.render();
            this.kick();
        }
    }

    kick() {
        this.current.visited = true;
        var next = this.current.checkNeighbors(this.grid, this.rows, this.cols);
        if(next) {
            this.current = next;
        }
    }

    render() {
        for(let i = 0; i < this.grid.length; i++) {
            this.grid[i].show(this.context, this.scale);
        }
        this.context.stroke();
    }
}

myMaze = new MyMaze(600, 400, 40, "myCanvas");

function startMaze() {
    myMaze.start();
}

function stopMaze() {
    myMaze.stop();
}

var loop = function() {
    myMaze.run();
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
