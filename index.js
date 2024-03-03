let flashArr = [];
let clickedArr = [];
let lvl = 0;
let isgamestarted = false;
let lvlpassed = true;
let flashlvl = 0;

let h2 = document.querySelector("h2");
let btns = document.querySelectorAll(".btn");
let resetbtn = document.querySelector(".resetbtn");
let helpbtn = document.querySelector(".helpbtn");
let helpdiv = document.getElementById("helpcontent");

gameBegin(0);

function gameBegin(newlevel) {
    if (newlevel == 0) {
        flashArr = [];
    }
    clickedArr = [];
    lvl = newlevel + 1;
    h2.innerText = `level ${lvl}`;
    console.log("level ", lvl);
    isgamestarted = true;
    let randno = Math.floor(Math.random() * 4) + 1;
    flash(500, "redd", randno);
    flashArr.push(randno);
    helpclk();
    resetbtn.removeEventListener("click", resethandler);
    resetclk();
    clickAction();
}

function clickAction() {
    let noOfclicks = 0;
    btns.forEach(btn => {
        btn.addEventListener("click", clickhandler);
    })
}
function helpclk() {
    helpbtn.addEventListener("click", helphandler);
}
function helphandler() {
    helpbtn.style.backgroundColor = "green";
    helpbtn.style.color = "black";
    setTimeout(() => {
        helpbtn.style.backgroundColor = "#0F4C75";
        helpbtn.style.color = "white";
    }, 200);
    console.log('help windo open');
    helpdiv.innerHTML = `
        <h3>=== Simon Game Help ===</h3>
        <p><strong>How to Play Memory Challenge Mode:</strong></p>
        <ol>
            <li>Click the "Reset" button to start the game.</li>
            <li>Watch the box which is blinked and click it</li>
            <li>You will pass the level and other box blinks.</li>
            <li>Now click the previous blinked box and current box.</li>
            <li>Keep going until you reach level 10!</li>
        </ol>
        <p><strong>Tips:</strong></p>
        <ul>
            <li>Pay close attention to the blinking sequence.</li>
            <li>Take your time to click each box correctly.</li>
            <li>Have fun and challenge your memory skills!</li>
        </ul>
        <p>Are you ready to begin? Click the "Reset" button to start!</p>
        <button id="closebtn">close</button>
`;
    helpdiv.classList.add("help");
    let closehlpbtn = document.getElementById("closebtn");
    closehlpbtn.addEventListener("click", () => {
        helpdiv.innerHTML = "";
        helpdiv.classList.remove("help");
    })
}
function resetclk() {
    resetbtn.addEventListener("click", resethandler);
}
function resethandler() {
    resetbtn.style.backgroundColor = "yellow";
    resetbtn.style.color = "black";
    setTimeout(() => {
        resetbtn.style.backgroundColor = "rgba(125, 125, 245, 0.536)";
        resetbtn.style.color = "white";
    }, 200);
    gameBegin(0);
    console.log("game reseted");
}

function clickhandler(evt) {

    if (clickedArr.length <= lvl) {
        console.log("btn clicked", evt.target.id);
        clickedArr.push(parseInt(evt.target.id));
        flash(100, "cyan", parseInt(evt.target.id));

        let count = 0;

        for (let i = 0; i < clickedArr.length; i++) {
            if (clickedArr[i] == flashArr[i]) {
                count++;
            } else {
                console.log("game over");
                h2.innerText = `You Lost in level ${lvl}`;
                document.body.style.backgroundColor = "red";
                setTimeout(() => {
                    document.body.style.backgroundColor = "#323232";
                }, 500);

                btns.forEach(btn => {
                    btn.removeEventListener("click", clickhandler);
                })
            }
        }
        if (count == lvl) {
            console.log("lvl passed");
            if (lvl == 10) {
                console.log("won the game");
                h2.innerText = "WON THE GAME";
                celebrations();
            } else {
                gameBegin(lvl);
            }
        } else {
            if (clickedArr.length == lvl) {
                console.log("game over");
                h2.innerText = `You Lost in level ${lvl}`;
                document.body.style.backgroundColor = "red";
                setTimeout(() => {
                    document.body.style.backgroundColor = "#323232";
                }, 500);

                btns.forEach(btn => {
                    btn.removeEventListener("click", clickhandler);
                })
            }
        }
        count = 0;
        console.log(clickedArr);
        console.log(flashArr);
    } else {
        btns.forEach(btn => {
            btn.removeEventListener("click", clickhandler);
        })
    }
}

function flash(delay, clr, x) {
    let flashbtn = document.getElementById(`${x}`);
    flashbtn.classList.add(clr);
    setTimeout(() => {
        flashbtn.classList.remove(clr);
    }, delay);
}
function celebrations() {
    changebg("green", 500, () => {
        changebg("grey", 500, () => {
            changebg("yellow", 500, () => {
                changebg("purple", 500, () => {
                    changebg("#323232", 500);
                })
            });
        });
    });
}

function changebg(clr, delay, callback) {
    let bdy = document.body;
    setTimeout(() => {
        bdy.style.backgroundColor = clr;
        if (typeof callback === 'function')
            callback();
    }, delay);
}

