let startButton = document.querySelector(".start-button span");
let tries = document.querySelector(".wrong span");
let gameBox = document.querySelectorAll(".game-box");



// Duration 
let duration = 1000;


// Start Button Function 
startButton.onclick = function () {
    let yourPromp = prompt("What Is Your Name?");
    if (yourPromp === "" || yourPromp === null) {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourPromp;
    }
    document.querySelector(".start-button").remove();
};

// Range Rundom 
let blocksRang = [...Array(gameBox.length).keys()];

shuffle(blocksRang);

// Change Order 
gameBox.forEach(function (el, index) {

    el.style.order = blocksRang[index];

    el.addEventListener("click", function () {
        flipped(el);

        finished();

    });
});

// Shuffle Function
function shuffle(array) {
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        random = Math.floor(Math.random() * current);

        current--;

        // Save Current Element in Stach 
        temp = array[current];

        // Change Current Element with Random Element
        array[current] = array[random];

        // Change Random Element With Stach Element
        array[random] = temp;
    }
};

// Flipped Click Function To Rotate The Box
function flipped(block) {

    block.classList.add("flipped");

    let allFlipped = [...gameBox].filter(flipe => flipe.classList.contains('flipped'));


    if (allFlipped.length == 2) {

        // Stop Clicking Function 
        stopCLick();

        // Checking About Element
        checkingELe(allFlipped[0], allFlipped[1]);

    }

};

// Stop Clicking Function 
function stopCLick() {
    // Stop Event Click From All Boxes
    document.querySelector(".memory-boxs").classList.add("no-click");

    // Remove Event Click
    setTimeout(() => {
        document.querySelector(".memory-boxs").classList.remove("no-click");
    }, duration);
};

// Checing Element Function
function checkingELe(element, index) {

    if (element.dataset.club === index.dataset.club) {

        // Remove Flipped Class 
        element.classList.remove("flipped");
        index.classList.remove("flipped");

        // Add has Flipped Class
        element.classList.add("has-flipped");
        index.classList.add("has-flipped");

        // Audio seccess
        document.querySelector(".seccess").play();


    } else {

        // Increase Wrong Tries 
        tries.innerHTML = parseInt(tries.innerHTML) + 1;

        // if Wrong Tries === 20 Show Message Game Offer
        if (tries.innerHTML == 20) {
            document.querySelector(".game-over").style.display = "block";

            document.querySelector(".game-over .over-button").onclick = function () {
                location.reload();
            }
        }

        setTimeout(() => {

            element.classList.remove("flipped");
            index.classList.remove("flipped");

        }, duration);

        // Remove Flipped Class 
        document.querySelector(".faile").play();

    };
};


// Finished Celebration Audio To Winners
function finished() {
    // Get them Memeory Boxs in Array
    let celebrateArray = [...document.querySelector(".memory-boxs").children];

    // Create New Empty Array
    let allCelebrateArray = [];

    for (let i = 0; i < celebrateArray.length; i++) {

        // Add Any ELement Has Class has-flipped in Empty Array
        allCelebrateArray.push(celebrateArray[i].classList.contains("has-flipped"));

        // Create New Array To Make Sure Is All Element in This Array Has Class has-flipped
        let newArryTrue = (allCelebrateArray.filter((el) => el === true));

        // Create if Condation When newArryTrue.lenght = celebrateArray.length 
        if (newArryTrue.length === celebrateArray.length) {

            // Play Celebration Audio 
            setTimeout(() => {

                document.querySelector(".seccession").play();

                document.querySelector(".celebrate").style.display = "block";
            }, duration);

            // Reload Button Click (Window Reload)
            document.querySelector(".celebrate .celebrate-button").onclick = function () {
                location.reload();
            }
        };

    };
};
