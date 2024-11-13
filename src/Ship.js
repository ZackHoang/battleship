export class Ship {
    constructor(length) {
        this.length = length;
        this.hitNum = 0;
        this.sunk = false;
        this.horizontal = true;  
        this.row = []; 
        this.col = []; 
    }

    hit() {
        this.hitNum++;
    }

    isSunk() {
        if (this.hitNum === this.length) {
            this.sunk = true; 
        } 
    }
}
