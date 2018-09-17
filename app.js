var allLevels = document.querySelector("ul");
var levels = allLevels.querySelectorAll("li");
var counter = document.querySelector(".counter");
var counter2 = document.querySelector(".counter2");
var popUpBox = document.querySelector(".lostPopupBox");
var tlo = document.querySelector(".board");
var lostFilter = document.querySelector(".overlay");
var startBtn = document.querySelector(".start");
var startOver = document.querySelector(".startOver");
var gameStarted = false;
var cnt = 0;
var lost = false;
var time = 0;
var defaultInterwal = 20;


function toggleClassLevels(i) {
    levels[i].classList.toggle("pickedlevel")
}

var level = "";
for (const li of levels) {
    li.addEventListener("click", function () {
        for (const li of levels) {
            li.classList.remove("pickedlevel");
            level = li.innerText;
        }
        this.classList.add("pickedlevel");
    });

}


function lostGame(a) {
    a.addEventListener("animationend", function () {
        tlo.querySelectorAll(".zombie").forEach(function (el) {
            el.remove();
            gameStarted = false;
        });

        counter2.innerText = cnt;
        if (lost === false) {
            tlo.classList.toggle("lost");
            popUpBox.classList.toggle("hidden");
            lostFilter.classList.toggle("hidden");
        }

        lost = true;
        cnt = 0;
        counter.innerText = cnt;
        clearInterval(time);
        startBtn.classList.remove("pickedlevel");
    });
}

function zombiesKilled(a) {
    a.addEventListener("click", function () {
        this.parentElement.removeChild(this);
        cnt++;
        counter.innerText = cnt;
    });
}


function createZombie() {
    var zombie = document.createElement("div");
    zombie.style.animationDuration = "0.7s, " + Math.floor((Math.random() * 10) + 5) + "s";

    zombie.classList.add("zombie");
    zombie.classList.add("animationDuration");

    var bottom = Math.floor((Math.random() * 30) + -10);
    zombie.style.bottom = bottom + "px";
    zombie.style.zIndex = 60 - bottom;
    tlo.appendChild(zombie);
    lostGame(zombie);
    zombiesKilled(zombie);
}


startBtn.addEventListener("click", function ZombieStart() {
    if (!gameStarted) {
        time = setInterval(createZombie, 500);
        gameStarted = true;
        startBtn.classList.add("pickedlevel");
    }
});


gameStarted = false;

startOver.addEventListener("click", function hideLostFilter() {
    popUpBox.classList.toggle("hidden");
    lostFilter.classList.toggle("hidden");
    cnt = 0;
    counter.innerText = cnt;
    lost = false;
});




