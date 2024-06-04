// game constants and variables 

let inputDir = 
           {
             x : 0 , 
             y : 0 
           }   

const foodsound = new Audio("eating-sound.mp3");    
const gameoversound = new Audio("game_over.mp3");
const movesound = new Audio("snake_movement_sound.mp3"); 
const musicsound = new Audio("music.mp3"); 

let speed = 5 ;  
let lastPaintTime = 0 ;   
let snakeArr = [  { x : 13 , y : 15 }  ] // array of object
let food = {x : 6 , y : 7 } ;  // object 
let score1 = 0 ; 

// game function 

function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed ){
    return ;
    }
    
    lastPaintTime = ctime ;
    gameEngine();
}

function isCollide(snake)
{
   // if you bump into yourself 
 
   for(let i=1;i<snakeArr.length;i++)
    {
       if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) 
        {
           return true ;
        }

      }    
      // if you bump into wall 
        if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0)
          {
             return true ;
          }
  //  return false ;
}

function gameEngine()
{
   // part 1: updating the snake array and food 
 
     if(isCollide(snakeArr))
      {
         gameoversound.play();
         musicsound.pause();
         inputDir = {x : 0 , y : 0 }
         alert("Game over ! press any key to play again .");
         snakeArr = [{ x : 13 , y : 15 }]
        //  musicsound.play();
         score1 = 0 ; 
         score.innerHTML = "Score " + score1 ;
      }


      // if you have eaten the food , increment the score and regenerate the food 
         if(snakeArr[0].y === food.y && snakeArr[0].x === food.x ) 
          {  
             foodsound.play();
             snakeArr.unshift({x : snakeArr[0].x + inputDir.x, y : snakeArr[0].y + inputDir.y });
              let a = 2 ;
              let b = 16 ;
              food = { x : Math.round(a + (b-a) * Math.random()) , y : Math.round(a + (b-a) * Math.random()) }
              score1++ ;
              if(score1 > hiscoreval)
                {
                   hiscoreval = score1 ;
                   localStorage.setItem("hiscore" , JSON.stringify(hiscoreval));
                   hiscoreb.innerHTML = "High score : " + hiscoreval ;  
                } 
              score.innerHTML = "Score " + score1 ;  
          }


          // moving snake 
         for(let i=snakeArr.length-2;i>=0;i--)
          {
             snakeArr[i+1] = {...snakeArr[i]};
          }

          snakeArr[0].x += inputDir.x ;
          snakeArr[0].y += inputDir.y ;


     // part 2: display the snake and food 
     // display snake 
       board.innerHTML = "" ;
      snakeArr.forEach((e , index ) => {
              snakeElement = document.createElement("div");
              snakeElement.style.gridRowStart = e.y ;
              snakeElement.style.gridColumnStart = e.x ;
              if(index === 0 )
                {
                  snakeElement.classList.add("head");
                }else 
                {
                snakeElement.classList.add("snake");
                }
              board.appendChild(snakeElement);
      });

    // display food 
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y ;
    foodElement.style.gridColumnStart = food.x ;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}


// main logic starts from here 

 let hiscore = localStorage.getItem("hiscore");
 if(hiscore === null )
 {
    let hiscoreval = 0 ;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval)) ;
 }else 
 {
    hiscoreval = JSON.parse(hiscore);
   hiscoreb.innerHTML = "High score : " + hiscore  ;
 }

window.requestAnimationFrame(main);

window.addEventListener('keydown' , e => {
    musicsound.play();
    inputDir = {x:0 , y:1} // start the game 
    movesound.play();
    switch(e.key)
    {
       case "ArrowUp" : 
       console.log("up");
       inputDir.x = 0;
       inputDir.y = -1;
       break ;
       
       case "ArrowDown" :
        console.log("down");
        inputDir.x = 0;
        inputDir.y = 1;
        break ; 

        case "ArrowLeft" : 
        console.log("left");
        inputDir.x = -1;
        inputDir.y = 0;
        break ;

        case "ArrowRight" : 
        console.log("right");
        inputDir.x = 1;
        inputDir.y = 0;
        break ;

        default : 
        console.log("nothing press ");

    }
});