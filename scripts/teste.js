class Cell {
    constructor(i, f) {
        this.i = i;
        this.f = f;
    }

    show(context, scale) {
        var x = this.i * scale;
        var y = this.f * scale;

        context.moveTo(x, y);
        context.lineTo(x + scale, y);

        context.moveTo(x + scale, y);
        context.lineTo(x + scale, y + scale);

        context.moveTo(x + scale, y + scale);
        context.lineTo(x, y + scale);

        context.moveTo(x, y + scale);
        context.lineTo(x, y);

        context.stroke();

        //context.fillRect(this.i * scaleH, this.f * scaleW, scaleW - 1, scaleH - 1);
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
            //logica
            this.render();
        }
    }

    render() {
        for(let i = 0; i < this.grid.length; i++) {
            this.grid[i].show(this.context, this.scale);
        }
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
