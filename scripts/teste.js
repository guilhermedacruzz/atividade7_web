class Cell {
    constructor(f, i) {
        this.f = f;
        this.i = i;
    }


    show(context, scaleW, scaleH) {
        context.fillRect(this.i * scaleW, this.f * scaleH, scaleW, this.scaleH);
    }
}

class MyMaze {

    constructor(width, height, scaleW, scaleH, idCanvas) {
        this.width = width;
        this.height = height;
        this.scaleW = scaleW;
        this.scaleH = scaleH;

        this.rows = height / scaleH;
        this.cols = width / scaleW;

        this.grid = [];

        for(let i = 0; i < this.rows; i++) {
            for(let f = 0; f < this.cols; f++) {
                this.grid.push(new Cell(f, i))
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
            this.grid[i].show(this.context, this.scaleW, this.scaleH);
        }
    }
}

myMaze = new MyMaze(400, 400, 40, 40, "myCanvas");

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
