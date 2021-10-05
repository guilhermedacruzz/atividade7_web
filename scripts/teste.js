
class MyMaze {

    constructor(width, height, scaleW, scaleH, idCanvas) {
        this.width = width;
        this.height = height;
        this.scaleW = scaleW;
        this.scaleH = scaleH;

        this.rows = height / scaleH;
        this.cols = width / scaleW;

        this.grid = [];

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

    render() {
        if(this.isRunning) {
            for(let i = 0; i < this.rows; i++) {
                for(let f = 0; f < this.cols; f++) {
                    this.context.fillRect(i * this.scaleW, f * this.scaleH, this.scaleW - 1, this.scaleH - 1);
                }
            }
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
    //lógica
    //render
    myMaze.render();
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
