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


// take name inputted 

const playFriends = document.querySelector('#friends')
playFriends.addEventListener('click',(e)=>{
    let player1 = document.querySelector('#player1').value;
    let player2 = document.querySelector('#player2').value;

    if (player1 == ''){
        player1 ='Player1';
    }
    if (player2 ==''){
        player2='Player2';
    }
    console.log(player1);
    console.log(player2)

    gameBoard.makePlayer1(player1);
    gameBoard.makePlayer2(player2);


    console.log('Hello friends.')
    //Start 
    changeMessage(gameBoard.currentPlayer().name,gameBoard.currentPlayer().mark)
    //hide form and show board 
    showBoard()
})


// play with CPU

const cpuButton = document.querySelector('#cpu')
cpuButton.addEventListener('click',(e)=>{
    let player1 = document.querySelector('#player1c').value;
    const level =  document.querySelector('#levels').value;
    if (player1 == ''){
        player1 ='Player1';
    }
    
    gameBoard.makePlayer1(player1); 
    gameBoard.makePlayer2('CPU',false);
    gameBoard.setLevel(level);
    console.log(`Hello ${level} .`)
    //Start 
    changeMessage(gameBoard.currentPlayer().name,gameBoard.currentPlayer().mark)
    //hide form and show board 
    showBoard()
})



function showBoard(){
    const friendForm = document.querySelector('.form-friends');
    const cpuForm = document.querySelector('.form-cpu');
    const messageDiv = document.querySelector('.message-div');
    const boardDiv = document.querySelector('.board-div');
    messageDiv.style.display='block';
    boardDiv.style.display='grid'
    friendForm.style.display='none';
    cpuForm.style.display='none';
}



const restart = document.querySelector('#restart')
restart.addEventListener('click',(e)=> {
    console.log('restart');
    gameBoard.startOver();
    changeMessage(gameBoard.currentPlayer().name,gameBoard.currentPlayer().mark)
    cleanUI();
    hideRestart()
    aiPlayer.aiReset()

})

function cleanUI(){
    document.querySelectorAll('.item').forEach(item =>{
    item.innerText='';
    
    return;})
}

const playerFactory = (name,mark,isHuman=true) => {
    return {name,mark,isHuman}
}


const gameBoard = (function (){
    let board = [['_','_','_'],
                 ['_','_','_'],
                 ['_','_','_']]
    let p1;
    let p2;
    let score;
    let cpuLevel;
    let moves = 0;
    //x play first
    let turn = p1;
    let gameEnd=false;
    
    function show(){
        return board;
    }
    
    function setLevel(lv){
        cpuLevel = lv;
    }

    function cpuMove(){
        const oneArray = [...board[0],...board[1],...board[2]]
        
         //random move from available position
        console.log(board);
        const availableMove=[]
        for (let i=0; i<9;i++){
            if (oneArray.at(i)=='_'){
        availableMove.push(i+1)
        }
        }
        if (cpuLevel=='Beginner'){
        const randomElement = availableMove[Math.floor(Math.random() * availableMove.length)];
        return randomElement;
        } else {
            const status = aiPlayer.show();
            return aiPlayer.minimax(status);
        }

    }

    function chooseMove(row,column,mark){
         board[row][column] =mark;
         moves++;
    }

    function makePlayer1(name){
        p1 = playerFactory(name,'X'); 
        turn = p1;
    }
     
    function makePlayer2(name,isHuman=true){
        p2 = playerFactory(name,'O',isHuman);   
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

    // for score comes from isWin()
    function scoring(){ 
        if(isWin()){
          const c = currentPlayer().mark;
          if(c=='X'){
            return -1
          }
          else if (c=='O'){
            return 1;
          }
        } return 0;
            
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
       makePlayer1:makePlayer1,
       makePlayer2:makePlayer2,
       setLevel:setLevel,
       cpuMove:cpuMove,
       scoring:scoring,
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
        if (e.target.innerText=='' & !gameBoard.gameOn() & gameBoard.currentPlayer().isHuman) {
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
            changeMessage(t.name,t.mark)}
            cpuWork()
            
    }
    
        
    })

})


const cpuWork = async() =>{
    await sleep(1000)
    // for cpu
    if (gameBoard.currentPlayer().isHuman==false){
        async () => await sleep(1000)
        console.log("Time to shine")
        
        const idx = gameBoard.cpuMove();
        console.log(idx);
        // update the board here first
        gameBoard.chooseMove(...getNumbers(idx),'O');
        //update the board in UI
        const cell = document.querySelector(`#cell${idx}`);
        cell.innerText= 'O'

    
        const p = gameBoard.currentPlayer()
    //check winner again after cpu move
    if (gameBoard.isWin()){
        announceGame(p.name,p.mark)
    }
    else if (gameBoard.isTie()){
        tieGame();
    }else{
    
    const t = gameBoard.changePlayer()
    changeMessage(t.name,t.mark)

}
    }

}




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







//https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
function transpose(matrix) {
    return matrix.reduce((prev, next) => next.map((item, i) =>
      (prev[i] || []).concat(next[i])
    ), []);
  }


// https://blog.devgenius.io/how-to-make-javascript-sleep-or-wait-d95d33c99909
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve,delay))



//ai minimax https://www.youtube.com/watch?v=D5aJNFWsWew&list=PLBw9d_OueVJS_084gYQexJ38LC2LEhpR4&index=1

const aiPlayer = (function () {
    //get current board
    let board = gameBoard.show();

    function aiReset(){
        board = gameBoard.show();
    }

    function show (){
        return board
    }
    
    function isWin(status,mark){
        // check row 
        for (let i=0; i<3;i++){
            if (counter(status[i],mark)){
                return true
            }
        }
        //check column 
        const transposed = transpose(status)
        for (let i=0; i<3;i++){
            if (counter(transposed[i],mark)){
                return true
            }
        }
        // check diagonal
        const left = [status[0][0],status[1][1],status[2][2]]
        if (counter(left,mark)){
            return true
        }
        const right = [status[2][0],status[1][1],status[0][2]]
        if (counter(right,mark)){
            return true
        }        
    return false;
    }

    function isTie(status){
        const oneArray = [...status[0],...status[1],...status[2]]
        for (let i=0;i< oneArray.length;i++){
            if (oneArray[i]=='_'){
                return false
            }
    
        }
        return true
    }

    function gameEnd(status){
        if (isTie(status) |isWin(status,'X')|isWin(status,'O')){
            return true;
        }
        return false;
    }
    function scoreGame(status){
        if(isWin(status,'O')){
            return 1
        } else if (isWin(status,'X')){
            return -1
        } else {
            return 0
        }
    }


    function availableMove(status){
        const oneArray = [...status[0],...status[1],...status[2]]
        
         //random move from available position
        const availables=[]
        for (let i=0; i<9;i++){
            if (oneArray.at(i)=='_'){
        availables.push(i+1)
        }
        }
        return availables
    }

    function chooseMove(status,row,column,mark){
        // new board each time
        const clone = structuredClone(status);
        clone[row][column] = mark;
        return clone
        
   }

    //minmax return optimal action(index)
    function minimax(status){
        if (gameEnd(status)){
            console.log('test')
        return;
        }
        return maximizeScore(status)[1]
    }
    

    //Minmax 
    function maximizeScore(status){
        if (gameEnd(status)){
            return [scoreGame(status),]
        }
        // maximize this value
        let value = -1000
        let move;
        const moves= availableMove(status)

        // available move array
        for (let i =0; i<moves.length;i++){
            
            const ls = getNumbers(moves[i])
            // alpha pruning
            const temp = minimizeScore(chooseMove(status,...ls,'O'))[0]
            if (temp ==-1){
                continue
            }
            value = Math.max(value, temp)
            if (value == temp){
                move = moves[i];
            }
        }       
        return [value, move]
    }

    function minimizeScore(status){
        if (gameEnd(status)){
            return [scoreGame(status),]
        }
        // minimize this value
        let value = 1000
        let move;
        const moves= availableMove(status)
        // available move array
        for (let i =0; i<moves.length;i++){
            const ls = getNumbers(moves[i])
            // alpha pruning
            const temp = maximizeScore(chooseMove(status,...ls,'X'))[0]
            if (temp == 1){
                continue;
            }
            value = Math.min(value, temp)
        }       
        return [value, move]
    }


    
    return {show,minimax,isWin,gameEnd,isTie,minimizeScore,maximizeScore,chooseMove,aiReset}
    
  
  }());




