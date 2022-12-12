let colorList, board, siz, rotation, rvel, cursorPiece;
let scaleSize = 1
let camspeed = 0.3;
let a = 8;
let b = 8;
let pieces = [];
let selected = null;
let select, moves, capture;
let btnRed , btnWhite;
let turn = 'white';
let mode = 'none';

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    angleMode(DEGREES);
    rotation = createVector(0, 0, 0);
    rvel = createVector(-5, 0, 0);
    colorList = ['#A0522D', '#DAA520'];
    siz = floor(height / 10);
	btnRed = createButton('RED WIN');
	btnRed.position(windowWidth/5, windowHeight/2);
	btnWhite = createButton('WHITE WIN');
	btnWhite.position(windowWidth*0.75, windowHeight/2);
	btnRed.size(100, 100);
    btnRed.style("background-color", 'white'); 
    btnRed.style('border-radius', '12px');
	btnWhite.size(100, 100);
    btnWhite.style("background-color", 'white'); 
    btnWhite.style('border-radius', '12px');
    order = [
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['X', 'X', 'X', 'X', 'X', 'X', 'X', 'X'],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
    ];
    board = [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
    ];
    let cx = (-3.5 * siz) + (5 * siz)
    let cz = (-3.5 * siz) + (4 * siz)
    cursorPiece = new Piece(height / 50, createVector(cx, 0, cz), 'C', 'white')
    for (let row = 0; row < a; row += 1) {
        for (let col = 0; col < b; col += 1) {
            if (order[row][col] != 'X') {
                let x = (-3.5 * siz) + (col * siz)
                let z = (-3.5 * siz) + (row * siz)
                let pos = createVector(x, 0, z)
                let pieceColor = 'brown';
                if (row < 2) pieceColor = 'red';
                else pieceColor = 'white';
                pieces.push(new Piece(height / 30.75, pos, order[row][col], pieceColor));
            }
        }
    }
}


function showMoves(type) {
    if (type == 'F') {
        for (let piece of pieces) {
            piece.type = 'N';
        }
    }
}

function keyPressed() {
    if (turn != 'END') {
        if (keyCode == 32) {
            for (let p of pieces) {
                p.color = p.origColor;
                if (p.tpos.x == cursorPiece.tpos.x && p.tpos.z == cursorPiece.tpos.z && p.color == turn) {
                    if ((turn == 'white' && p.color == 'white') || (turn == 'red' && p.color == 'red')) {
                        select.play();
                        selected = p;
                        p.color = 'yellow';
                        showMoves(p.type);
                    }

                }
            }
        }

        if (keyCode == 13 && selected) {
            if (whosThere() == null) {
                select.play();
                selected.color = selected.origColor;
                selected.tpos.x = cursorPiece.tpos.x;
                selected.tpos.z = cursorPiece.tpos.z;
                switchTurn();

            } else if (whosThere()
                .origColor != turn) {
                if (whosThere()
                    .type == 'K' && whosThere()
                    .origColor == 'white') {
                    capture.play();
                    mode = 'red';
					let col = color(25, 23, 200, 50);
					btnRed.style('background-color', col);
                } else if (whosThere()
                    .type == 'K' && whosThere()
                    .origColor == 'red') {
                    capture.play()
                    mode = 'white'
					let col = color(25, 23, 200, 50);
					btnWhite.style('background-color', col);
                };
                capture.play();
                whosThere().tpos.x = width / 2
                selected.color = selected.origColor;
                selected.tpos.x = cursorPiece.tpos.x;
                selected.tpos.z = cursorPiece.tpos.z;
                switchTurn();
            }
            selected.color = selected.origColor;
            selected = null;
        }

        if (keyCode == LEFT_ARROW && cursorPiece.tpos.x > (-3 * siz)) {
            moves.play();
            cursorPiece.tpos.x -= siz;
        }
        if (keyCode == RIGHT_ARROW && cursorPiece.tpos.x < (3 * siz)) {
            moves.play();
            cursorPiece.tpos.x += siz;
        }

        if (keyCode == UP_ARROW && cursorPiece.tpos.z > (-3 * siz)) {
            moves.play();
            cursorPiece.tpos.z -= siz;
        }
        if (keyCode == DOWN_ARROW && cursorPiece.tpos.z < (3 * siz)) {
            moves.play();
            cursorPiece.tpos.z += siz;
        }

        switch (mode) {

        case 'red':
            print('Red Wins!');
            turn = 'END';
            break

        case 'white':
            print('White Wins!');
            turn = 'END';
            break
        }
    }

}

function switchTurn() {

    if (turn == 'white') {
        turn = 'red';
        cursorPiece.color = 'red'
    } else {
        turn = 'white';
        cursorPiece.color = 'white'
    }

}

function whosThere() {
    for (let piece of pieces) {
        if (piece.tpos.x == cursorPiece.tpos.x && piece.tpos.z == cursorPiece.tpos.z) return piece;
    }
    return null;
}

function preload() {
    capture = loadSound('capture.wav');
    moves = loadSound('pieceMove.wav');
    select = loadSound('selection.wav');
}

function draw() {
    background(222,184,135);
    ambientLight(100)
    pointLight(100, 100, 100, windowHeight, -windowWidth, windowHeight)
    scale(scaleSize);
    rotateEverything();
    moveCamera();
    for (let row = 0; row < a; row += 1) {
        for (let col = 0; col < b; col += 1) {
            push();
            translate(0, siz / 4, 0);
            let x = (-3.5 * siz) + (col * siz);
            let z = (-3.5 * siz) + (row * siz);
            noStroke();
            fill(colorList[board[row][col]]);
            translate(x, 0, z);
            box(siz, siz / 2, siz);
            pop();
        }
    }

    cursorPiece.show();
    cursorPiece.move();
    for (let piece of pieces) {
        piece.show();
        piece.move();
    }
}
