export class Ship {
    constructor(length) {
        this.length = length;
        this.hitNum = 0;
        this.row = [];
        this.col = [];
    }

    hit() {
        this.hitNum++;
    }

    isSunk() {
        if (this.hitNum === this.length) {
            return true;
        }

        return false;
    }
}
