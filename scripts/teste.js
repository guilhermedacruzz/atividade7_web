
let width = 400;
let height = 400;
let w = 40;
let h = 40;

var cols = height/w;
var rows = width/h;

var myMaze = {

    canvas : document.getElementById("myCanvas"),

    start : function() {
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }    
}

function startMaze() {
    myMaze.start();
}

var loop = function() {
    //lógica
    //render
    renderTest();
    window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);


var renderTest = function() {
    for(let i = 0; i < rows; i++) {
        for(let f = 0; f < cols; f++) {
            myMaze.context.fillRect(i * w, f * h, w - 1, h -1);
        }
    }
}