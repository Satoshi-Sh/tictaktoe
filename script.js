const playerFactory = (name,mark) => {
    return {name,mark}
}

function counter(array,mark){
    let number =0;
    for (let i =0; i<array.length;i++){
        if(array.at(i)==mark)
        number++
    }
    return number ==3;
}

//https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
function transpose(matrix) {
    return matrix.reduce((prev, next) => next.map((item, i) =>
      (prev[i] || []).concat(next[i])
    ), []);
  }


const gameBoard = (function (){
    let board = [['_','_','_'],
                 ['_','_','_'],
                 ['_','_','_']]
    const p1 = playerFactory('Sato','x');
    const p2 = playerFactory('Relakku','o');
    let moves = 0;
    //x play first
    let turn = p1
    
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
    }

    function isWin(){
        // check row 
        for (let i=0; i<3;i++){
            if (counter(board[i],turn.mark)){
                console.log(`${turn.name} Won!!!`)
                return true
            }
        }
        //check column 
        const transposed = transpose(board)
        for (let i=0; i<3;i++){
            if (counter(transposed[i],turn.mark)){
                console.log(`${turn.name} Won!!!`)
                return true
            }
        }
        // check diagonal
        const left = [board[0][0],board[1][1],board[2][2]]
        if (counter(left,turn.mark)){
            console.log(`${turn.name} Won!!!`)
                return true
        }
        const right = [board[2][0],board[1][1],board[0][2]]
        if (counter(right,turn.mark)){
            console.log(`${turn.name} Won!!!`)
                return true
        }


        
    return false;
    }

    function isTie(){
        if(moves ==9) {
        console.log('Tie Game...')
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

    return {
       board:board,
       start:start,
       show:show,
       chooseMove:chooseMove,
       takeTurn:takeTurn,
       }

})();