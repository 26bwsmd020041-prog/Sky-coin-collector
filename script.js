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

let playerX = 0;
let items = [];

// Start Game
startBtn.onclick = startGame;
restartBtn.onclick = startGame;

function startGame(){

    score = 0;
    lives = 3;

    scoreText.textContent = "🪙 Score: 0";
    livesText.textContent = "❤️❤️❤️";

    startScreen.style.display = "none";
    gameOver.style.display = "none";

    items.forEach(item => item.element.remove());
    items = [];

    playerX = game.clientWidth / 2;
    player.style.left = playerX + "px";

    playing = true;

}

// Mouse Control
game.addEventListener("mousemove", function(e){

    if(!playing) return;

    const rect = game.getBoundingClientRect();

    playerX = e.clientX - rect.left;

    movePlayer();

});

// Touch Control
game.addEventListener("touchmove", function(e){

    if(!playing) return;

    e.preventDefault();

    const rect = game.getBoundingClientRect();

    playerX = e.touches[0].clientX - rect.left;

    movePlayer();

});

function movePlayer(){

    if(playerX < 30) playerX = 30;
    if(playerX > game.clientWidth - 30)
        playerX = game.clientWidth - 30;

    player.style.left = playerX + "px";

}

// Spawn Coins/Bombs
setInterval(function(){

    if(!playing) return;

    const bomb = Math.random() < 0.3;

    const obj = document.createElement("div");

    obj.className = bomb ? "bomb" : "coin";

    obj.textContent = bomb ? "💣" : "🪙";

    const x = Math.random() * (game.clientWidth - 40);

    obj.style.left = x + "px";
    obj.style.top = "-40px";

    objects.appendChild(obj);

    items.push({

        x:x,
        y:-40,
        bomb:bomb,
        element:obj

    });

},700);

// Game Loop
function gameLoop(){

    if(playing){

        for(let i=items.length-1;i>=0;i--){

            let item = items[i];

            item.y += 5;

            item.element.style.top = item.y + "px";

            // Collision
            if(item.y > game.clientHeight - 130 &&
               Math.abs(item.x-playerX) < 35){

                if(item.bomb){

                    lives--;

                }else{

                    score += 10;

                }

                scoreText.textContent = "🪙 Score: " + score;
                livesText.textContent = "❤️".repeat(lives);

                item.element.remove();
                items.splice(i,1);

            }

            // Missed
            else if(item.y > game.clientHeight){

                item.element.remove();
                items.splice(i,1);

            }

        }

        if(lives <= 0){

            playing = false;

            finalScore.textContent = "Score: " + score;

            gameOver.style.display = "flex";

        }

    }

    requestAnimationFrame(gameLoop);

}

gameLoop();
