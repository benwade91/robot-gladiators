var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}
var getPlayerName = function () {
    var name = window.prompt("What is your robots name?");
    while (typeof name === "object" || name === "") {
        name = window.prompt("What is your robots name?");
    }
    return name;
}

var startGame = function () {
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("Would you like to visit the store?");
                if (storeConfirm) {
                    shop();
                }
            }
        } else {
            alert("You have lost your robot it battle! Game Over!");
            break;
        }
    }
    endGame();
};

var endGame = function () {
    window.alert("The game has now ended. Lets see how you did!");
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + "!");
    } else {
        window.alert("You've lost your robot in battle!")
    }
    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thanks for playing Robot Gladiators!");
    }
}

var fight = function (enemy) {
    console.log(enemy);
    while (enemy.health > 0 && playerInfo.health > 0) {
        var isPlayerTurn = true;
        if (Math.random() > .5) {
            isPlayerTurn = false;
        }
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you'd like to quit?")
            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip the fight!");
                playerInfo.money = Math.max(0, playerInfo.money - 2);
                console.log("playerInfo.money", playerInfo.money);
                break;
            } else {
                fight();
            }
        }
        if (promptFight === "fight" || promptFight === "FIGHT") {
            if (isPlayerTurn) {
                var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack)
                enemy.health = Math.max(0, enemy.health - damage);
                console.log(
                    playerInfo.name + " attacked " + enemy.name + "! " + enemy.name + " now has " + enemy.health + " health remaining!"
                );
                if (enemy.health <= 0) {
                    window.alert(enemy.name + " has died!");
                    playerInfo.money += 5;
                    break;
                } else {
                    window.alert(enemy.name + " still has " + enemy.health + " health!");
                }
                var damage = randomNumber(enemy.attack - 3, enemy.attack)
                playerInfo.health = Math.max(0, playerInfo.health - damage);
                console.log(
                    enemy.name + " attacked " + playerInfo.name + "! " + playerInfo.name + " now has " + playerInfo.health + " health remaining!"
                );
                if (playerInfo.health <= 0) {
                    window.alert(playerInfo.name + " has died!");
                    break;
                } else {
                    window.alert(playerInfo.name + " still has " + playerInfo.health + " health!");
                }
            } else {
                var damage = randomNumber(enemy.attack - 3, enemy.attack)
                playerInfo.health = Math.max(0, playerInfo.health - damage);
                console.log(
                    enemy.name + " attacked " + playerInfo.name + "! " + playerInfo.name + " now has " + playerInfo.health + " health remaining!"
                );
                if (playerInfo.health <= 0) {
                    window.alert(playerInfo.name + " has died!");
                    break;
                } else {
                    window.alert(playerInfo.name + " still has " + playerInfo.health + " health!");
                }
                var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack)
                enemy.health = Math.max(0, enemy.health - damage);
                console.log(
                    playerInfo.name + " attacked " + enemy.name + "! " + enemy.name + " now has " + enemy.health + " health remaining!"
                );
                if (enemy.health <= 0) {
                    window.alert(enemy.name + " has died!");
                    playerInfo.money += 5;
                    break;
                } else {
                    window.alert(enemy.name + " still has " + enemy.health + " health!");
                }
            }
        }
    }
};

var shop = function () {
    var shopOptionPrompt = window.prompt("Would you like to REFILL (1) your health, UPGRADE (2) your attack, or LEAVE (3) the store? Please enter one: 1, 2 or 3 to make a choice.");
    switch (shopOptionPrompt.toLowerCase()) {
        case "1":
            playerInfo.refillHealth();
            break;
        case "2":
            playerInfo.upgradeAttack();
            break;
        case "2":
            window.alert("Now leaving the store.");
            break;
        default:
            window.alert("That didn't work! Try a valid option!");
            shop();
            break;
    }
};

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function () {
        if (this.money >= 5) {
            window.alert("Refilling your health +50!");
            this.health += 50;
            this.money -= 5;
        } else {
            window.alert("You dont have enough money!")
        }
    },
    upgradeAttack: function () {
        if (this.money >= 5) {
            window.alert("Upgrading your attack +10!");
            this.attack += 10;
            this.money -= 5;
        } else {
            window.alert("You dont have enough money!")
        }
    }
};

var enemyInfo = [{
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

startGame();