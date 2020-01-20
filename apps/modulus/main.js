function resizeCanvas() {
    let el=document.getElementById("view");
    el.height = window.innerHeight;
    el.width = window.innerWidth;
}

window.onresize = resizeCanvas;

var displayMap = (function() {
    let map = {};

    map.init = function() {
        
    };
    map.refresh = function() {
        
    }



    map.matrix = (function() {
        let m = [];
        let canvas = document.getElementById("view");
        let unitHeight = (canvas.height/25-canvas.height%25);
        let unitWidth = (canvas.width/25-canvas.width%25);
        console.log("init matrix to " + unitWidth + " x " + unitHeight);
        for (let i=0; i < unitHeight; i++) {
            let r=[];
            for (let j=0; j < unitWidth; j++) {
                r[r.length] = 0;
            }
            m[m.length] = r;
        }
        return m;
    })();

    map.list = []
    map.addModule = function(mod) {
        this.list += mod;
        this.refresh();
    };

    map.draw = function() {
        let canvas = document.getElementById("view");
        let ctx = canvas.getContext("2d");
        for (var i=0; i< this.matrix.length; i++) {
            for (var j=0; j<this.matrix[0].length; j++) {
                ctx.fillStyle = "#b8b8b8";
                ctx.beginPath();
                ctx.rect(j*25, i*25, 25, 25);
                ctx.fill()
                ctx.fillStyle = "#5c5c5c";
                ctx.beginPath();
                ctx.rect((j*25)+5, (i*25)+5, 15, 15);
                ctx.fill();
            }
        }
    };
    return map;
})();
displayMap.draw();

class Module {
    constructor() {
        
    }
    draw() {
        
    }
    main() {
        
    }
    //n in units, not pixels
    set height(n) {
        this.height = n;
    }
    set width(n) {
        this.width = n;
    }

    get height() {
        return this.height;
    }
    get width() {
        return this.width;
    }
    set draw(fun) {
        this.draw = fun;
    }
}

function exportModule(name) {
    
}

function Wire() {
    
}

function Output() {
    
}

function Input() {
    
}


// var active = false;
// var ctx = new window.AudioContext();
// var audioBuf = ctx.createBuffer(2, ctx.sampleRate/2, ctx.sampleRate);

// var arrayBuffer = new ArrayBuffer(ctx.sampleRate/2);
// var bufView = new Uint8Array(arrayBuffer);
// function sinewave(step) { return Math.sine(440*step*(ctx.sampleRate/(2*Math.pi))); }

// var s = 0;
// var v;
// function createSignal() {
//     active = true;
//     while (active) {
//         if (s >= ctx.sampleRate) {
//             s = 0;
//         }
//         v = sigGen(s++);
//         console.log(v);
//     }
// }
// createSignal();
