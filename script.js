const game = document.getElementById("game");
const player = document.getElementById("player");
const objects = document.getElementById("objects");

const scoreText = document.getElementById("score");
const livesText = document.getElementById("lives");

const startScreen = document.getElementById("startScreen");
const gameOver = document.getElementById("gameOver");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const finalScore = document.getElementById("finalScore");

let score = 0;
let lives = 3;
let playing = false;
let playerX = 200;

let items = [];

// Move player
game.addEventListener("mousemove", moveMouse);
game.addEventListener("touchmove", moveTouch);

function moveMouse(e){
    if(!playing) return;
    playerX = e.offsetX;
    player.style.left = playerX + "px";
}

function moveTouch(e){
    if(!playing) return;
    e.preventDefault();
    playerX = e.touches[0].clientX;
    player.style.left = playerX + "px";
}

// Start game
startBtn.onclick = startGame;
restartBtn.onclick = startGame;

function startGame(){

    startScreen.style.display="none";
    gameOver.style.display="none";

    score=0;
    lives=3;

    scoreText.textContent="🪙 Score: 0";
    livesText.textContent="❤️❤️❤️";

    items.forEach(i=>i.element.remove());
    items=[];

    playing=true;

}

// Spawn objects
setInterval(()=>{

    if(!playing) return;

    let obj=document.createElement("div");

    let bomb=Math.random()<0.3;

    obj.className=bomb?"bomb":"coin";
    obj.textContent=bomb?"💣":"🪙";

    let x=Math.random()*(game.clientWidth-40);

    obj.style.left=x+"px";
    obj.style.top="-40px";

    objects.appendChild(obj);

    items.push({
        x:x,
        y:-40,
        bomb:bomb,
        element:obj
    });

},700);

// Game loop
function update(){

    if(playing){

        for(let i=items.length-1;i>=0;i--){

            let item=items[i];

            item.y+=4;

            item.element.style.top=item.y+"px";

            if(item.y>game.clientHeight-120 &&
               Math.abs(item.x-playerX)<40){

                if(item.bomb){

                    lives--;

                }else{

                    score+=10;

                }

                scoreText.textContent="🪙 Score: "+score;
                livesText.textContent="❤️".repeat(lives);

                item.element.remove();
                items.splice(i,1);

            }

            if(item.y>game.clientHeight){

                item.element.remove();
                items.splice(i,1);

            }

        }

        if(lives<=0){

            playing=false;

            finalScore.textContent="Score: "+score;

            gameOver.style.display="flex";

        }

    }

    requestAnimationFrame(update);

}

update();
