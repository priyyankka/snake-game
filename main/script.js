function startgame(){
  let score=0;

  let snake=[
    {x:30,y:150},
    {x:20,y:150},
    {x:10,y:150},
    {x:0,y:150}
  ]
    const snake_bg="#34DA00";
    const snake_bc="#029401";
    const game_bg="#1A1D1C";
    const game_bc="#15304A";
    var foodx,foody;

    var canvas=document.getElementById("gameCanvas");
    var t=100;

    ctx=canvas.getContext("2d");
    clear();
    drawsnake();

    var dx=10, dy=0;
    createfood();
    document.addEventListener("keydown",changedirection);
    main();




  function main(){

    if(didgameend()){

      alert("Game Over");
      return;
  }
    setTimeout(function delay(){

    clear();
    drawfood();
    advancesnake();
    drawsnake();
    document.getElementById('score').innerHTML=" "+score;

    main();

  },t);}


  function clear(){
    ctx.fillStyle=game_bg;
    ctx.strokeStyle=game_bc;

    ctx.fillRect(0,0,gameCanvas.width,gameCanvas.height);
    ctx.strokeRect(0,0,gameCanvas.width,gameCanvas.height);
  }

  function drawsnake(){
    snake.forEach(drawsnakePart);
    }
  function drawsnakePart(snakepart2){
    ctx.fillStyle=snake_bg;
    ctx.strokeStyle=snake_bc;

    ctx.fillRect(snakepart2.x,snakepart2.y,10,10);
    ctx.strokeRect(snakepart2.x,snakepart2.y,10,10);
  }
  function drawfood(){
    ctx.fillStyle="red";
    ctx.strokeStyle="black";
    ctx.fillRect(foodx,foody,9,9);
    ctx.strokeRect(foodx,foody,10,10);

  }

  function advancesnake(){

    const head={x: snake[0].x + dx , y : snake[0].y + dy};

    snake.unshift(head);

    const dideat= (snake[0].x===foodx )&& (snake[0].y===foody)

    if(dideat){
      createfood();
      score+=10;
      t/=1.1;
    }
    else
    {
      snake.pop();
    }
}

//Generate food for the snake
function createfood(){
  foodx=Math.round((Math.random()*gameCanvas.width-10)/10)*10;
  foody=Math.round((Math.random()*gameCanvas.height-10)/10)*10;

  snake.forEach(function snakeeatfood(part){
    const food=part.x===foodx && part.y===foody;
    if(food)
    createfood();
  })
}


function changedirection(event){
  const left=37,up=38,right=39,down=40;
  const key=event.keyCode;
  const gl=dx===-10;

  const gr=dx===10;
  const gd=dy===10;
  const gu=dy===-10;

  if ((!gr)&&(key===left)){
    dx=-10;dy=0;

  }
  if((key===right)&&(!gl)){
    dx=10;dy=0;
  }
  if((key===up)&&(!gd)){
    dx=0;dy=-10;
  }
  if ((!gu)&&(key===down)){
    dx=0;dy=10;
  }

}


function didgameend(){

  for (let i=4;i<snake.length;i++){
    for(let j=0;j<i;j++){

      if((snake[i].x===snake[j].x)&&(snake[i].y===snake[j].y))
      return true;

    }
  }
  if((snake[0].x<0)||(snake[0].x>gameCanvas.width-10)||(snake[0].y<0)||(snake[0].y>gameCanvas.height-10))
  return true;
  return false;
}
}
