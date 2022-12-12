class Piece {
    constructor(pSize, pos, type, color) {
        this.pos = createVector(0, 0, 0);
        this.tpos = pos;
        this.pSize = pSize;
        this.type = type;
        this.color = color;
        this.origColor = color;
    }
    show() {
        specularMaterial(this.color);
        noStroke();

        switch (this.type) {
            // Pawn
        case 'P':
            push();
            translate(this.pos.x, this.pos.y, this.pos.z)
            cylinder(this.pSize / 3.5, this.pSize / 3.5)
            translate(0, -this.pSize / 3 - this.pSize / 4, 0)
            cylinder(this.pSize / 2.5, this.pSize / 2.5)
            translate(0, -this.pSize / 3 - this.pSize / 4, 0)
            sphere(this.pSize / 3)
            pop();
            break;
            // Rook
        case 'R':
            push();
            translate(this.pos.x, this.pos.y, this.pos.z);
            translate(0, this.pSize / 8, 0)
            cylinder(this.pSize, this.pSize / 2)
            translate(0, -this.pSize, 0);
            rotate(180);
            cylinder(this.pSize / 1.5, this.pSize * 1.5);
            translate(0, this.pSize / 2, 0)
            cylinder(this.pSize, this.pSize / 2);
            pop();
            break;
            // Knight
        case 'N':
            push();
            translate(this.pos.x, this.pos.y, this.pos.z);
            translate(0, this.pSize / 8, 0)
            cylinder(this.pSize, this.pSize / 2)
            translate(0, -this.pSize, 0);
            rotate(180);
            cone(this.pSize / 1.5, this.pSize * 2);
            translate(0, this.pSize / 2, 0)
            rotateX(90);
            rotateZ(90)
            ellipsoid(this.pSize / 2, this.pSize, this.pSize / 2);
            pop();
            break;
            // Bishop
        case 'B':
            push();
            translate(this.pos.x, this.pos.y, this.pos.z);
            translate(0, this.pSize / 8, 0)
            cylinder(this.pSize, this.pSize / 2)
            translate(0, -this.pSize, 0);
            rotate(180);
            cone(this.pSize / 1.5, this.pSize * 2);
            translate(0, this.pSize, 0)
            ellipsoid(this.pSize / 2, this.pSize, this.pSize / 2);
            pop();
            break;
            // Queen
        case 'Q':
            push();
            translate(this.pos.x, this.pos.y, this.pos.z);
            translate(0, this.pSize / 8, 0)
            cylinder(this.pSize, this.pSize / 2)
            translate(0, -this.pSize * 1.5, 0);
            rotate(180);
            cylinder(this.pSize / 1.5, this.pSize * 3);
            translate(0, this.pSize * 1.5, 0)
            cylinder(this.pSize, this.pSize / 2);
            translate(0, this.pSize / 2, 0);
            sphere(this.pSize / 2);
            pop();
            break;
            // King
        case 'K':
            push();
            translate(this.pos.x, this.pos.y, this.pos.z);
            cylinder(this.pSize * 1.3, this.pSize * 1.3);
            translate(0, 1 - this.pSize, 0);
            cylinder(this.pSize, this.pSize);
            translate(0, -this.pSize / 1.5, 0);
            sphere(this.pSize / 2);
            pop();
            break;
        case 'C':
            push();
            noFill();
            stroke(this.color);
            strokeWeight(2);
            translate(this.pos.x, this.pos.y, this.pos.z);
            translate(0, -this.pSize * 1.75, 0)
            box(this.pSize * 2, this.pSize * 5, this.pSize * 2);
            pop();
            break;
        case 'BOARD':
            push();
            noFill();
            stroke(this.color);
            strokeWeight(0);
            translate(this.pos.x, this.pos.y, this.pos.z);
            translate(0, -this.pSize * 1.5, 0)
            box(this.pSize * 2, this.pSize * 2, this.pSize * 2);
            pop();
            break;
        }
    }
    move() {
        this.pos.lerp(this.tpos, 0.09);
    }
}
