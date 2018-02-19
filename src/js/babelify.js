(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

// index..js (Mahreen Qureshi)

var myGamePiece;
var myObstacles = [];
var myScore;
var gameOver;

function startGame() {
    myGamePiece = new component(20, 20, "purple", 10, 200);
    myObstacle = new component(10, 200, "yellow", 300, 120);
    myScore = new component("30px", "Verdana", "white", 280, 40, "text");
    gameOver = new component("30px", "Verdana", "white", 280, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function start() {
        this.canvas.width = document.body.clientWidth;
        this.canvas.height = 400;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = myGameArea.keys || [];
            myGameArea.keys[e.keyCode] = true;
        });
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        });
    },
    clear: function clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function stop() {
        clearInterval(this.interval);
    }

};
function everyinterval(n) {
    if (myGameArea.frameNo / n % 1 == 0) {
        return true;
    }
    return false;
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + this.width;
        var mytop = this.y;
        var mybottom = this.y + this.height;
        var otherleft = otherobj.x;
        var otherright = otherobj.x + otherobj.width;
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + otherobj.height;
        var crash = true;
        if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
            crash = false;
        }
        return crash;
    };
}

function updateGameArea() {
    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            document.getElementById("tryAgain").style.display = "block";
            console.log('game over');
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(160)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 60;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(10, height, "deeppink", x, 0));
        myObstacles.push(new component(10, x - height - gap, "yellow", x, height + gap));
    }

    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }

    if (myGameArea.keys && myGameArea.keys[37]) {
        myGamePiece.speedX = -1;
    }
    if (myGameArea.keys && myGameArea.keys[39]) {
        myGamePiece.speedX = 1;
    }
    if (myGameArea.keys && myGameArea.keys[38]) {
        myGamePiece.speedY = -1;
    }
    if (myGameArea.keys && myGameArea.keys[40]) {
        myGamePiece.speedY = 1;
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function moveup() {
    myGamePiece.speedY -= 1;
}

function movedown() {
    myGamePiece.speedY += 1;
}

function moveleft() {
    myGamePiece.speedX -= 1;
}

function moveright() {
    myGamePiece.speedX += 1;
}

function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

function refreshPage() {
    window.location.reload();
}

},{}]},{},[1]);
