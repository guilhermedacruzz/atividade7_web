
class Cell {
    constructor(i, f) {
        this.i = i;
        this.f = f;
        this.visited = false;
        this.wasRender = true;
        this.walls = {
            "top":true,
            "right":true,
            "bottom":true,
            "left":true
        }
    }

    index(i, f, rows, cols) {

        if(i < 0 || f < 0 || i > cols - 1 || f > rows - 1) {
            return -1;
        }

        return i + f * cols;
    }

    checkNeighbors(grid, rows, cols) {
        this.wasRender = true;
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

        for(let i = 0; i < neighbors.length; i++) {
            neighbors[i].wasRender = true;
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

        if(this.walls["top"]) {
            context.moveTo(x, y);
            context.lineTo(x + scale, y); 
        }

        if(this.walls["right"]) {
            context.moveTo(x + scale, y);
            context.lineTo(x + scale, y + scale);
        }

        if(this.walls["bottom"]) {
            context.moveTo(x + scale, y + scale);
            context.lineTo(x, y + scale);
        }

        if(this.walls["left"]) {
            context.moveTo(x, y + scale);
            context.lineTo(x, y);
        }

        if(this.visited) {
            context.fillStyle="#7F7F00";
            context.fillRect(x, y, scale, scale);
        }

        this.wasRender = false;
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

    reset() {
        this.context.clearRect(0, 0, this.width, this.height);
        this.grid = [];
        for(let i = 0; i < this.rows; i++) {
            for(let f = 0; f < this.cols; f++) {
                this.grid.push(new Cell(f, i));
            }
        }
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
        else {
            this.reset();
        }
    }

    render() {
        var control = false;
        for(let i = 0; i < this.grid.length; i++) {
            if(this.grid[i].wasRender) {
                this.grid[i].show(this.context, this.scale);
                control = true;
            }
        }
        if(control)
            this.context.stroke();
    }
}

myMaze = new MyMaze(600, 400, 20, "myCanvas");

function startMaze() {
    myMaze.start();
}

function stopMaze() {
    myMaze.stop();
}

function resetMaze() {
    myMaze.reset();
}

var loop = function() {
    myMaze.run();
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);