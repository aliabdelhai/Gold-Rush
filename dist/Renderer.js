class Renderer{
    generateMatrix(row, col, board){
        let numberOfCoins = 0
        let playerSizeRatio = 10/(parseInt(row)+parseInt(col))
        this.gridBoard(row, col)
        for (let r = 0; r < board.matrix.length; r++) {
            for (let c = 0; c < board.matrix[r].length; c++) {
                switch (board.matrix[r][c]) {
                    case 'ghost':
                        $('#board').append(`<div class='brick'></div>`)
                        break;
                    case 'gold':
                        $('#board').append(
                            `<div class='path' style="font-size: ${2*playerSizeRatio}em">
                                <i class="fas fa-pizza-slice" style="color: gold"></i>
                            </div>`)
                        break;
                    case 1: 
                        $('#board').append(
                            `<div class='path' style="font-size: ${3*playerSizeRatio}em">
                                <i class="fas fa-cat" style="color: blue;"></i>
                            </div>`)
                        break;
                    case 2:
                        $('#board').append(
                            `<div class='path' style="font-size: ${3*playerSizeRatio}em">
                                <i class="fas fa-cat" style="color: pink;"></i>
                            </div>`)
                        break;
                    case '.': 
                        $('#board').append(
                            `<div class='path'>
                            </div>`)
                        break
                } 
            }
        }

        numberOfCoins = this.getNumOfCoins(board)

        if (!numberOfCoins) {
            let player1 = board.player1.score 
            let player2 = board.player2.score 

            if(player1 == player2 ){
                $('#board').append(`
                    <div id="winDiv">
                        <h1 align="center" id="win">Draw</h1>
                        <h1 align="center" id="win">${player1} VS ${player2}</h1>
                    </div>
                    `)
                    return numOfCoins;
            }
            let winner = board.player1.score > board.player2.score ? 1 : 2 
            $('#board').append(`
                <div id="winDiv">
                    <h1 align="center" id="win">Player ${winner} WIN!!!</h1>
                    <h1 align="center" id="win">${player1} VS ${player2}</h1>
                </div>
                `)
                return numOfCoins;
        }
    }

    getNumOfCoins(board) {
        let numOfCoins = 0;
        for (let i = 0; i < board.matrix.length; i++) {
            for (let j = 0; j < board.matrix[i].length; j++) {
                if(board.matrix[i][j] === 'gold'){
                    numOfCoins++
                }
            }
        }
        return numOfCoins;
    }

    gridBoard(row, col) {
        $('#board').empty()
        $('#board').css('grid-template-rows', `repeat(${row}, 1fr)`)
        $('#board').css('grid-template-columns', `repeat(${col}, 1fr)`)
    }

    updateScore(player){
        $(`#player${player.id} > h3:nth-child(2)`).text(`Score: ${player.score}`)
    }
    
    countDown(k){
        $('#countDown').remove()
        if(k<3){
            $('#board').append(`<h1 id='countDown'>${(-k)+3}</h1>`)
        }
    }
}
    
