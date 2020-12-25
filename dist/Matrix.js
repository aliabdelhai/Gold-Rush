class Matrix{

    constructor(numRows, numColumns){
        this.matrix = this.generateMatrix(numRows, numColumns)
    }

    generateMatrix(numRows, numColumns){
        let matrix = []
        for (let r = 0; r < numRows; r++) {
            matrix.push([])
            for (let c = 0; c < numColumns; c++) {
                matrix[r].push('.')
            }
        }
        return matrix
    }

    print()
    {
        for (let i = 0; i < this.matrix.length; i++) {
            let line = ""
            for (let j = 0; j < this.matrix[i].length; j++) {
                line += (this.matrix[i][j] + "\t")
            }
            console.log(line)
        }
    }

    get(row, column) {
        return this.matrix[row][column]
    }

    alter(row, column, val) { 
        this.matrix[row][column] = val
    }

    printColumn(column) {
        for (let i = 0; i < this.matrix.length; i++) {
            console.log(this.matrix[i][column])
        }
    }

    printRow(row) {
        for (let i = 0; i < this.matrix[row].length; i++) {
            console.log(this.matrix[row][i])
        }
    }

    findCoordinate(value) {
        for (let r = 0; r < this.matrix.length; r++) {
            for (let c = 0; c < this.matrix[r].length; c++) {
                if(this.matrix[r][c] == value) {
                    return {x: c, y: r}
                }
            }
        }
    }

}

