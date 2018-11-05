//Completed extra feature: End-of-game-Notification
let puzzleTile;
let timing;
let whiteYPos='300px';
let whiteXPos='300px';
let message = document.getElementsByClassName("explanation");
let counter;

window.addEventListener("load", onStart);

function onStart(){
	let puzzleArea = document.getElementById("puzzlearea");
	puzzleTile = puzzleArea.getElementsByTagName('div');
	for(let l = 0; l<puzzleTile.length;l++){
		puzzleTile[l].style.backgroundImage = "url('background.jpg')";
        puzzleTile[l].className = 'puzzlepiece';
        puzzleTile[l].style.left = (l%4*100)+'px';
        puzzleTile[l].style.top = (parseInt(l/4)*100) + 'px';
        puzzleTile[l].style.backgroundPosition= '-' + puzzleTile[l].style.left + ' ' + '-' + puzzleTile[l].style.top;
        puzzleTile[l].addEventListener('mouseenter',ifMovable);
        puzzleTile[l].addEventListener('mouseout',revert);
        puzzleTile[l].addEventListener('click',swapTile);
	}
    let shuffleButton = document.getElementById('shufflebutton');
    shufflebutton.addEventListener('click',shuffle);
}

function ifMovable(){
	if(movableTile(parseInt(this.innerHTML)-1)){
		this.classList.add('movablepiece');
	}
}

function revert(){
	this.classList.remove("movablepiece");
}

function swapTile(){
	if (movableTile(parseInt(this.innerHTML)-1))
        {
            swap(this.innerHTML-1);
            checkWin();
       	}
}

function shuffle(){
	for(let x = 0; x<250; x++){
		let r = Math.floor(Math.random() * 4);
		let temp
            	if (r == 0)
            	{
                	temp = whiteSpacePosUp(whiteXPos, whiteYPos);
                	if ( temp != -1)
                	{
                    	swap(temp);
                	}
            	}
            	if (r == 1)
            	{
                	temp = whiteSpacePosDown(whiteXPos, whiteYPos);
                	if ( temp != -1) 
                	{
                    	swap(temp);
                	}
            	}
            	if (r == 2)
            	{
                	temp = whiteSpacePosLeft(whiteXPos, whiteYPos);
                	if ( temp != -1)
                	{
                    	swap(temp);
                	}
            	}
            	if (r == 3)
            	{
                	temp = whiteSpacePosRight(whiteXPos, whiteYPos);
                	if (temp != -1)
                	{
                    	swap(temp);
                	}
            	}
    }
}

function movableTile(tilePos){
	if (whiteSpacePosLeft(whiteXPos, whiteYPos) == (tilePos))
    {
        return true;
    }

    if (whiteSpacePosDown(whiteXPos, whiteYPos) == (tilePos))
    {
        return true;
    }

    if (whiteSpacePosUp(whiteXPos, whiteYPos) == (tilePos))
    {
        return true;
    }

    if (whiteSpacePosRight(whiteXPos, whiteYPos) == (tilePos))
    {
        return true;
    }

}

function checkWin(){
	let flag = true;
    for (let i = 0; i < puzzleTile.length; i++){
        let yPos = parseInt(puzzleTile[i].style.top);
        let xPos = parseInt(puzzleTile[i].style.left);

        if (xPos != (i%4*100) || yPos != parseInt(i/4)*100)
        {
            flag = false;
            break;
        }
    }
    if(flag==true){
    	won();
    }
}


function winningMessage(){
	let body = document.getElementsByTagName('body');
	counter--;
	if(counter >0){
		message[1].innerHTML="You win!";
		message[1].style.fontWeight = "900";
		message[1].style.fontSize = "xx-large"
		for(let i=0;i<1000;i++){
			let letters = '0123456789ABCDEF';
  			let color = '#';
  			for (let x = 0; x < 6; x++) {
    			color += letters[Math.floor(Math.random() * 16)];
  			}
  			body[0].style.backgroundColor = color;
		}
		timing = setTimeout(winningMessage,100);
	}else{
		message[1].innerHTML="American puzzle author and mathematician Sam Loyd is often falsely credited with creating the puzzle; indeed, Loyd claimed from 1891 until his death in 1911 that he invented it.  The puzzle was actually created around 1874 by Noyes Palmer Chapman, a postmaster in Canastota, New York.";
		message[1].style.fontWeight = "normal";
		message[1].style.fontSize = "14px"
		body[0].style.backgroundColor = "#FFFFFF";
	}
}
function won(){
	counter = 10;
	winningMessage();
}

function whiteSpacePosLeft(x, y)
{
    let xPos = parseInt(x);
    let yPos = parseInt(y);

    if (xPos > 0)
    {
        for (let i = 0; i < puzzleTile.length; i++) 
        {
            if (parseInt(puzzleTile[i].style.left) + 100 == xPos && parseInt(puzzleTile[i].style.top) == yPos)
            {
                return i;
            } 
        }
    }
    else 
    {
        return -1;
    }
}

function whiteSpacePosRight(x, y)
{
    let xPos = parseInt(x);
    let yPos = parseInt(y);
    if (xPos < 300)
    {
        for (let i =0; i<puzzleTile.length; i++){
            if (parseInt(puzzleTile[i].style.left) - 100 == xPos && parseInt(puzzleTile[i].style.top) == yPos) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}

function whiteSpacePosUp(x, y)
{
    let xPos = parseInt(x);
    let yPos = parseInt(y);
    if (yPos > 0)
    {
        for (let i=0; i<puzzleTile.length; i++)
        {
            if (parseInt(puzzleTile[i].style.top) + 100 == yPos && parseInt(puzzleTile[i].style.left) == xPos) 
            {
                return i;
            }
        } 
    }
    else 
    {
        return -1;
    }
}

function whiteSpacePosDown(x, y)
{
    let xPos = parseInt(x);
    let yPos = parseInt(y);
    if (yPos < 300)
    {
        for (let i=0; i<puzzleTile.length; i++)
        {
            if (parseInt(puzzleTile[i].style.top) - 100 == yPos && parseInt(puzzleTile[i].style.left) == xPos) 
            {
                return i;
            }
        }
    }
    else
    {
        return -1;
    } 
}

function swap(Pos)
{
    let temp = puzzleTile[Pos].style.top;
    puzzleTile[Pos].style.top = whiteYPos;
    whiteYPos = temp;

    temp = puzzleTile[Pos].style.left;
    puzzleTile[Pos].style.left = whiteXPos;
    whiteXPos = temp;
}