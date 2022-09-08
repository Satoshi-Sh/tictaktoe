let message = document.querySelector('.message')

// opening trigger 
function showFriendForm(){
    const opening = document.querySelector('.opening')
    const friendForm = document.querySelector('.form-friends')
    opening.style.display='none';
    friendForm.style.display='flex';
}

function showCpuForm(){
    const opening = document.querySelector('.opening')
    const cpuForm = document.querySelector('.form-cpu')
    opening.style.display='none';
    cpuForm.style.display='flex';

}

const friend= document.querySelector('#Friend');
friend.onclick=showFriendForm

const cpu= document.querySelector('#CPU');
cpu.onclick=showCpuForm






const restart = document.querySelector('#restart')
restart.addEventListener('click',(e)=> {
    console.log('restart');
    gameBoard.startOver();
    changeMessage(gameBoard.turn.name,gameBoard.turn.mark)
    cleanUI();
    hideRestart()

})

function cleanUI(){
    document.querySelectorAll('.item').forEach(item =>{
    item.innerText='';
    
    return;})
}

const playerFactory = (name,mark) => {
    return {name,mark}
}


const gameBoard = (function (){
    let board = [['_','_','_'],
                 ['_','_','_'],
                 ['_','_','_']]
    const p1 = playerFactory('Sato','X');
    const p2 = playerFactory('Relakku','O');
    let moves = 0;
    //x play first
    let turn = p1
    let gameEnd=false;
    
    function show(){
        console.log(board)
  
    }


    function chooseMove(row,column,mark){
         board[row][column] =mark;
         moves++;
    }

    function changePlayer(){
        if (turn==p1){
            turn = p2} else{
               turn = p1
            }
            console.log(`${turn.name}'s turn`)
            return turn;
    }
    function currentPlayer(){
        return turn;
    }

    function isWin(){
        // check row 
        for (let i=0; i<3;i++){
            if (counter(board[i],turn.mark)){
                console.log(`${turn.name} Won!!!`)
                gameEnd=true;
                return true
            }
        }
        //check column 
        const transposed = transpose(board)
        for (let i=0; i<3;i++){
            if (counter(transposed[i],turn.mark)){
                console.log(`${turn.name} Won!!!`)
                gameEnd=true;
                return true
            }
        }
        // check diagonal
        const left = [board[0][0],board[1][1],board[2][2]]
        if (counter(left,turn.mark)){
            console.log(`${turn.name} Won!!!`)
                gameEnd=true;
                return true
        }
        const right = [board[2][0],board[1][1],board[0][2]]
        if (counter(right,turn.mark)){
            console.log(`${turn.name} Won!!!`)
            gameEnd=true;
            return true
        }


        
    return false;
    }

    function isTie(){
        if(moves ==9) {
        console.log('Tie Game...')
        gameEnd=true;
        return true;
        }
        return false;
    }
    function takeTurn(){
     let row = 0
     let col = 0
     while (true) {
     row = prompt(`Choose Row ${turn.name}`)
     col = prompt(`Choose column ${turn.name}`)
     if (row < 0| col <0| row>2 |col>2 ){
        console.log('Invalid Move')
     } else if (board[row][col]!='_'){
        console.log('Taken')
    
     } else{
        return [row,col]
     }

     }}

     function gameOn(){
        return gameEnd;
     }
     
     function start(){
     while (true){   
     let array= takeTurn();
     let row = array.at(0);
     let col = array.at(1);
     
     chooseMove(row,col,turn.mark)
     show();
     //check the winner
     if (isWin()) {
        break
     };
     //check tie game
     if (isTie()) {
        break;
     };
     // switch player
     changePlayer()
     
    }
    };

    function startOver(){
        board = [['_','_','_'],
                 ['_','_','_'],
                 ['_','_','_']]
        moves = 0;
        //x play first
        turn = p1
        gameEnd=false;
    }

    return {
       board:board,
       turn:turn,
       changePlayer:changePlayer,
       start:start,
       show:show,
       chooseMove:chooseMove,
       takeTurn:takeTurn,
       currentPlayer:currentPlayer,
       isWin:isWin,
       isTie:isTie,
       gameOn:gameOn,
       startOver:startOver,
       }

})();




function counter(array,mark){
    let number =0;
    for (let i =0; i<array.length;i++){
        if(array.at(i)==mark)
        number++
    }
    return number ==3;
}

function getNumbers(index){
    if (index==1){
        return [0,0]
    }
    else if (index==2){
        return [0,1]
    }
    else if (index==3){
        return [0,2]
    }
    else if (index==4){
        return [1,0]
    }
    else if (index==5){
        return [1,1]
    }
    else if (index==6){
        return [1,2]
    }
    else if (index==7){
        return [2,0]
    }
    else if (index==8){
        return [2,1]
    }
    else if (index==9){
        return [2,2]
    }


}


// add trigger to the item

document.querySelectorAll(".item").forEach(cell =>
    {
        cell.addEventListener('click',(e)=>{
        if (e.target.innerText=='' & !gameBoard.gameOn()) {
            const c = gameBoard.currentPlayer();
            e.target.innerText= c.mark;
            // update the board gameBoard
            const index = parseInt(e.target.getAttribute('id').at(-1))
            const array = getNumbers(index)
            gameBoard.chooseMove(array[0],array[1],c.mark)
            //check winner
            if (gameBoard.isWin()){
                announceGame(c.name,c.mark)
            }
            else if (gameBoard.isTie()){
                tieGame();
            }else{
            const t = gameBoard.changePlayer();
            changeMessage(t.name,t.mark)
        }
        }
        })
    })


function changeMessage(name,mark){
    message.innerHTML = `${name}'s Turn: ${mark}`
}

function announceGame(winner,mark){
    message.innerHTML = `${winner} won!! ${mark}`
    showRestart()
}

function tieGame(){
    message.innerHTML = `Tie game...`
    showRestart()
}

function showRestart(){
const restartDiv = document.querySelector('.restart-div')
restartDiv.style.display='block';
}

function hideRestart(){
    const restartDiv = document.querySelector('.restart-div')
    restartDiv.style.display='none';
    }

//Start 
changeMessage(gameBoard.turn.name,gameBoard.turn.mark)





//https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
function transpose(matrix) {
    return matrix.reduce((prev, next) => next.map((item, i) =>
      (prev[i] || []).concat(next[i])
    ), []);
  }

