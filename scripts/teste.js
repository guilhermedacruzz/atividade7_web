var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

let width = 400;
let height = 400;
let w = 40;
let h = 40;

var cols = width/w;
var rows = height/h;

function startMaze() {
    myMaze();
}

var myMaze = function() {
    for(let i = 0; i < rows; i++) {
        for(let f = 0; f < cols; f++) {
            ctx.fillRect(i * w, f * h, w - 1, h -1);
        }
    }
}