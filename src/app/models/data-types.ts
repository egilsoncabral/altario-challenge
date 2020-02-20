interface Coords {
    x: number;
    y: number;
}

interface Size {
    width: number;
    height: number;
}

class Matrix {
    width: number;
    height: number;
    data: Array<string>;

    getChar(coords: Coords){
        return this.data[coords.y * this.width + coords.x]
    }
}

interface Signature {
    matrix: Matrix;
    code: string;
}

interface Payment {
    name: string,
    amount: number,
    signature: Signature
}

export { Matrix, Signature, Coords, Size, Payment }