const render = new Renderer()

let goldRush 
let player1 
let player2 
let rowInput
let colInput
let isMoveAllow = false
let playerMoving 
let numOfCoins


$('#generateBoard').on('click', function () {
    isMoveAllow = false
    rowInput = $('#rowInput').val()
    colInput = $('#colInput').val()
    if (rowInput == "" || colInput == "") {
        alert('Please enter how many rows and columns you want')
        return
    }
    goldRush = new GoldRush (rowInput, colInput)
    goldRush.checkPathForGold()
    player1 = goldRush.player1
    player2 = goldRush.player2
    goldRush.alter(0, 0, 1)
    goldRush.alter(rowInput-1, colInput-1, 2)
    render.generateMatrix(rowInput, colInput, goldRush)
    for (let i = 0; i < 4; i++) {
        let k = i
        setTimeout(function(){ 
            render.countDown(k)
            if (k == 3){
                isMoveAllow = true
            }
        }, 1000*(k+1))
    }
})

const renderingTheMoveAndScore = (playerMoving, rowInput, colInput, move) => {
    goldRush.movePlayer(playerMoving, move)
    render.generateMatrix(rowInput, colInput, goldRush)
    render.updateScore(playerMoving)
}


$(document).on('keypress', function(e){
    if(isMoveAllow){
        if (e.which == 119 || e.which == 97 || e.which == 115 || e.which == 100) {
            playerMoving = player1
        } else {
            playerMoving = player2
        }
        switch (e.which) {
            case 119 : case 105: 
                renderingTheMoveAndScore(playerMoving, rowInput, colInput, 'up')
                break;
            case 97 : case 106:
                renderingTheMoveAndScore(playerMoving, rowInput, colInput, 'left')
                break;
            case 115: case 107:
                renderingTheMoveAndScore(playerMoving, rowInput, colInput, 'down')
                break;
            case 100 : case 108: 
                renderingTheMoveAndScore(playerMoving, rowInput, colInput, 'right')
                break;
        } 
        numOfCoins = render.getNumOfCoins(goldRush)
        if(numOfCoins == 0)
        {
            isMoveAllow = false;
        }
    }
      
})



