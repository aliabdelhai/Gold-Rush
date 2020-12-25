class GoldRush extends Matrix {

    constructor(rowNum, colNuM){
        super(rowNum, colNuM)
        this.rowNum = rowNum - 1
        this.colNuM = colNuM - 1
       
        this.player1 = {
            id: 1,
            rowNum: 0,
            colNuM: 0,
            score: 0,
            path : []
        }
        this.player2 = {
            id: 2,
            rowNum: rowNum - 1,
            colNuM: colNuM - 1,
            score: 0,
            path : []
        }
    }

    getPlayerPosition(player) {
        return {rowNum: player.rowNum, colNuM: player.colNuM}
    }

    checkPosition(pos){
        switch (pos) {
            case 'ghost':  
                return true;
            case '$':  
                return true;
            case 1:  
                return true;
            case 2:  
                return true;
            default:
                return false;
        }
    }

    checkMovement(player, direction){
        let {rowNum, colNuM} = this.getPlayerPosition(player)
        switch (direction) {
            case 'up':
                return rowNum == 0 || this.checkPosition(this.get(rowNum-1, colNuM)) ? false : true 
            case 'down':
               return rowNum == this.rowNum || this.checkPosition(this.get(rowNum+1, colNuM)) ? false : true 
            case 'right':
                return colNuM == this.colNuM || this.checkPosition(this.get(rowNum, colNuM+1)) ? false : true 
            case 'left':
                return colNuM == 0 || this.checkPosition(this.get(rowNum, colNuM-1)) ? false : true     
            default:
                break;
        }
    }

    updatePlayerPos(player, rowNum, colNuM) {
        player.rowNum = rowNum
        player.colNuM = colNuM
    }

    updateScore(rowNum, colNuM, player) {
        if (this.matrix[rowNum][colNuM] == 'gold') {
            player.score++
        }
    }

    movePlayer(player, direction) {
        if(!this.checkMovement(player,direction)){
            return false;
        }
        let rowNum = player.rowNum
        let colNuM = player.colNuM
        this.alter(rowNum, colNuM, '.')
        switch (direction) {
            case 'up':
                rowNum--
                break;
            case 'down':
                rowNum++
                break;
            case 'right':
                colNuM++
                break;
            case 'left':
                colNuM--
                break;
            default:
                break;
        }
        this.updatePlayerPos(player, rowNum, colNuM)
        this.updateScore(rowNum, colNuM, player) 
        this.alter(rowNum, colNuM, player.id)
        return true 
    }

    randomGenerator(){ 
        this.matrix = this.generateMatrix(this.rowNum + 1, this.colNuM + 1)
        this.newMatrix = []
        let random 
        for (let r = 0; r  <= this.rowNum; r++) {
            this.newMatrix.push([])
            for (let c = 0; c <= this.colNuM; c++) {
                random = Math.random() 
                switch (true) {
                    case random < 0.3:
                        this.matrix[r][c] = 'ghost'
                        this.newMatrix[r].push('ghost')
                        break;
                    case random > 0.3 && random < 0.9:
                        this.matrix[r][c] = 'gold'
                        this.newMatrix[r].push('gold')
                        break;
                    default:
                        this.matrix[r][c] = '.'
                        this.newMatrix[r].push('.')
                        break;
                }
            }
         }
        return this.newMatrix
    }

    checkPath = (rowNumS, colNuMS, rowNumM, colNuMM, matrix, playerId) => {
        if (rowNumS < 0 || colNuMS < 0 || rowNumS > this.rowNum || colNuMS > this.colNuM) return false
        if(matrix[rowNumS][colNuMS] == 'ghost' || matrix[rowNumS][colNuMS] == '$' || matrix[rowNumS][colNuMS] == (playerId == 1 ? 2:1)) return false
        matrix[rowNumS][colNuMS] = '$'
        let player = (playerId == 1 ? this.player1 : this.player2)
        if (rowNumS == rowNumM && colNuMS== colNuMM){
            player.path.unshift({'rowNum': rowNumS, 'colNuM': colNuMS})
            return true  
        } 
        if (this.checkPath(rowNumS-1, colNuMS, rowNumM, colNuMM, matrix, playerId)){
            player.path.unshift({'rowNum': rowNumS, 'colNuM': colNuMS})
            return true  
        } 
        if (this.checkPath(rowNumS, colNuMS+1, rowNumM, colNuMM, matrix, playerId)){
            player.path.unshift({'rowNum': rowNumS, 'colNuM': colNuMS})
            return true  
        }       
        if (this.checkPath(rowNumS+1, colNuMS, rowNumM, colNuMM, matrix, playerId)){
            player.path.unshift({'rowNum': rowNumS, 'colNuM': colNuMS})
            return true  
        }      
        if (this.checkPath(rowNumS, colNuMS-1, rowNumM, colNuMM, matrix, playerId)) {
            player.path.unshift({'rowNum': rowNumS, 'colNuM': colNuMS})
            return true  
        }
        return false
    }

    copyMatrix() {
        let newMatrix = [] 
        for (let r =  0; r < this.matrix.length; r++) {
            newMatrix.push([])
            for (let c =  0; c < this.matrix[r].length; c++) {
                newMatrix[r].push(this.matrix[r][c])
            }
         }
        return newMatrix
    }

    checkPathForGold = () => {
        let golds = []
        let flag = false
        while (!flag) {
            golds = [{rowNum: this.rowNum, colNuM: this.colNuM}]
            this.path = []
            this.randomGenerator()
            for (let r = 0; r < this.matrix.length; r++) {
                for (let c = 0; c < this.matrix[r].length; c++) {
                    if (this.matrix[r][c] == 'gold') {
                        golds.push({
                            rowNum: r,
                            colNuM: c
                        })
                    }
                }
            } 
            flag = true
            for (let i = 0; i < golds.length; i ++) {
                flag = this.checkPath(0, 0, golds[i].rowNum, golds[i].colNuM, this.newMatrix, 1)
                if (!flag){
                    break
                } 
                this.newMatrix = this.copyMatrix()
            }
        }
        return true
    } 
}




