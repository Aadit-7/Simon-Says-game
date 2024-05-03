let userSeq = [];
let gameSeq = [];
let btns = ["yellow", "red", "green", "blue"];
let highScore = 0;
let started = false;
let level = 0;

let h3 = document.querySelector("h3");

//To check that game is stated or not
document.addEventListener("keypress", function () {
  if (!started) {
    console.log("Game started....");
    started = true;
    levelUp();
  }
});

//To give the level number along with the random color to start the first level
function levelUp() {
  userSeq = []; // Set user sequence to initial as level is updates
  level++;
  h3.innerHTML = `Level ${level} <br> HighScore is ${highScore} `;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);

  btnFlash(randBtn);
}

//To make a flash for a random button.
function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

//To click the button by user
function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function btnPressed() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", btnPressed);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
      highScore++;
    }
  } else {
    h3.innerHTML = `Game over..!! Your score was <b>${level}</b> <br> Press any to start again.<br> High score is ${highScore} `;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);

    if (level > highScore) {
      highScore = level - 1;
    }

    reset();
  }
}

function reset() {
  started = false;
  userSeq = [];
  gameSeq = [];
  level = 0;
}

// function highScr(){
//     if(highScore > level){
//         console.log(highScore - 1);
//     }else{
//         console.log(level);
//     }
// }
