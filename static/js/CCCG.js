function idGenerator(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function createCard(cardData, hand) {
    let card = document.createElement("div");
    card.id = idGenerator(15);
    if (hand === ".inHandCards") {
        card.setAttribute("draggable", "true");
        card.addEventListener("dragstart", function () {
            dragstartHandler(event)
        }, false);
    } else if (hand === ".enemyCards") {
        card.setAttribute("draggable", "false");
        card.style.cursor = "not-allowed";
    }
    card.className = "playing-card";
    let cardName = document.createElement("div");
    cardName.textContent = cardData.name;
    cardName.className = "card-name";
    let cardPower = document.createElement("div");
    cardPower.textContent = cardData.power;
    cardPower.className = "power-number";
    let cardImage = document.createElement("img");
    cardImage.src = `${cardData.image}`;
    cardImage.ondragstart = function () {
        return false;
    };
    let cardHealth = document.createElement("div");
    cardHealth.textContent = cardData.health;
    cardHealth.className = "health-number";
    let cardMana = document.createElement("div");
    cardMana.textContent = cardData.mana;
    cardMana.className = "mana-number";

    card.appendChild(cardPower);
    card.appendChild(cardImage);
    card.appendChild(cardHealth);
    card.appendChild(cardMana);
    card.appendChild(cardName);

    card.dataset.power = cardData.power;
    card.dataset.health = cardData.health;
    card.dataset.mana = cardData.mana;

    let cardSlots = document.querySelectorAll(`${hand} > div`);
    let emptySlot = null;
    for (let slot of cardSlots) {
        // WORKING version
        if (slot.innerHTML.trim() === "") {
            emptySlot = slot;
            break;
        }
        // TODO dynamic enemy card creation
        // if (hand === ".inHandCards") {
        //     if (slot.innerHTML.trim() === "") {
        //         emptySlot = slot;
        //         break;
        //     }
        // }
        // if (hand === ".enemyCards") {
        //     if (slot.innerHTML.trim() === "" && Math.round(Math.random())) {
        //         emptySlot = slot;
        //         break;
        //     }
        // }
        // TODO ends here
    }

    if (emptySlot) {
        emptySlot.appendChild(card);
    }
}

function displayHealth(opponent) {
    let health = document.querySelector(opponent);
    let playerHealth = health.dataset.health;

    let image = document.createElement("img");
    image.src = "https://i.imgur.com/0XwkL3b.png";

    health.textContent = playerHealth;
    health.appendChild(image);
    health.style.backgroundSize = `${playerHealth * 2}%`
}


function damageOpponent(damage, opponent) {
    let currentHealth = document.querySelector(opponent);
    currentHealth.dataset.health = (parseInt(currentHealth.dataset.health) - damage).toString();
    displayHealth(opponent);
    if (opponent === "#player-health") {
        alert("You have taken damage!");
    }
}

function dragstartHandler(e) {
    e.dataTransfer.setData("id", e.target.id);
}

function dragoverHandler(e) {
    e.preventDefault();
    if (e.target.getAttribute("draggable") === true) {
        e.dataTransfer.dropEffect = "none";
    } else {
        e.dataTransfer.dropEffect = "all";
    }
}

function dropHandler(e) {
    e.preventDefault();
    let id = e.dataTransfer.getData("id");
    let dragged = document.getElementById(id);
    if (e.target.innerHTML.trim() !== "") {
        alert("SUWAIPA NO SWIPIN!!")
    } else {
        e.target.appendChild(dragged);
        dragged.setAttribute("draggable", "false");
        dragged.style.cursor = "not-allowed";
    }
}


function initDragAndDrop() {
    let combatSlots = document.querySelectorAll(".playerCards> div");
    for (let slot of  combatSlots) {
        slot.addEventListener('drop', dropHandler);
        slot.addEventListener('dragover', dragoverHandler);
    }
}

function winCheck(counter) {
    if (counter === "4") {
        alert("Congrats, you finished Codecool! TIME TO GET WORKIN'!");
        document.location.reload(true)
    } else {
    }
    let playerHealth = parseInt(document.querySelector("#player-health").dataset.health),
        enemy = document.querySelector("#enemy-health"),
        enemyHealth = parseInt(enemy.dataset.health);
    if (playerHealth <= 0 && enemyHealth <= 0) {
        alert("You both failed, you have 5 seconds to get out.");
        return 0;
    } else if (playerHealth <= 0) {
        alert("You did not pass your PA, you have failed miserably!");
        document.location.reload(true);
    } else if (enemyHealth <= 0) {
        alert("You successfully passed your PA, well done!");
        enemy.dataset.health = "50";
        displayHealth("#enemy-health");
        return 1;
    }
}



function calculateBattle(attacker, defender) {
    let damageToPlayer = 0, damageToEnemy = 0,
        attackHp = parseInt(attacker.dataset.health),
        attackDmg = parseInt(attacker.dataset.power),
        defendHp = 0, defendDmg = 0;

    if (defender == null) {
        defendHp = 0; defendDmg = 0
    } else {
        defendHp = parseInt(defender.dataset.health);
        defendDmg = parseInt(defender.dataset.power);}

    if (attackDmg >= defendHp) {
        defendHp = (defendHp - attackDmg);
        damageToPlayer = (defendHp * -1)
    } else if (attackDmg < defendHp) {
        defendHp = (defendHp - attackDmg);}

    if (defendDmg >= attackHp) {
        attackHp = (attackHp - defendDmg);
        damageToEnemy = (attackHp * -1)
    } else if (defendDmg < attackHp) {
        attackHp = (attackHp - defendDmg);}

    if (attackHp <= 0) {
        attacker.parentElement.removeChild(attacker)
    } else {
        attacker.children[2].innerHTML = attackHp.toString();}

    if (defender == null) {
    } else if (defendHp <= 0) {
        defender.parentElement.removeChild(defender)
    } else {
        defender.children[2].innerHTML = defendHp.toString();}

    if (defender == null) {
    } else {
        defender.dataset.health = defendHp.toString();
    }
    attacker.dataset.health = attackHp.toString();

    return [damageToPlayer, damageToEnemy];
}

function initDamageOpponent(damageType, opponent) {
        if (damageType > 0) {
        damageOpponent(damageType, opponent)
    }
}


function initCardCreation(list, hand) {
        for (let i = 0; i < 4; i++) {
        createCard(list[Math.floor(Math.random() * list.length)], hand)
    }
}

function doBattlePhase() {
    let attackerOne = document.querySelector("#enemy-card-1").firstChild,
        attackerTwo = document.querySelector("#enemy-card-2").firstChild,
        attackerThree = document.querySelector("#enemy-card-3").firstChild,
        attackerFour = document.querySelector("#enemy-card-4").firstChild,
        defenderOne = document.querySelector("#position-1").firstChild,
        defenderTwo = document.querySelector("#position-2").firstChild,
        defenderThree = document.querySelector("#position-3").firstChild,
        defenderFour = document.querySelector("#position-4").firstChild;


    let firstPhase = calculateBattle(attackerOne, defenderOne),
        secondPhase = calculateBattle(attackerTwo, defenderTwo),
        thirdPhase = calculateBattle(attackerThree, defenderThree),
        fourthPhase = calculateBattle(attackerFour, defenderFour);

    let damageToPlayer = firstPhase[0] + secondPhase[0] + thirdPhase[0] + fourthPhase[0];
    let damageToEnemy = firstPhase[1] + secondPhase[1] + thirdPhase[1] + fourthPhase[1];

    initDamageOpponent(damageToPlayer, "#player-health");
    initDamageOpponent(damageToEnemy,"#enemy-health");

    let player = document.querySelector("#player-health"),
        counter = winCheck(player.dataset.counter);
    player.dataset.counter = (parseInt(player.dataset.counter) + counter).toString();


    initCardCreation(cards, ".inHandCards");
    initCardCreation(enemyCards, ".enemyCards");
}


function initBattle() {
    const fightButton = document.querySelector(".fight");
    fightButton.addEventListener("click", doBattlePhase);
}

// let randomNumberForCards = Math.floor(Math.random() * 4);

function main() {
    let audio = new Audio('/');
    let promise = audio.play();

    if (promise !== undefined) {
    promise.then(_ => {
    }).catch(error => {});
}


    initCardCreation(cards, ".inHandCards");
    initCardCreation(enemyCards, ".enemyCards");

    displayHealth("#player-health");
    displayHealth("#enemy-health");
    initDragAndDrop();
    initBattle();
}

main();