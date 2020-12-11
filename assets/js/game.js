var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function (enemyName) {
    while (enemyHealth > 0 && playerHealth > 0) {

        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        if (promptFight === "skip" || promptFight === "SKIP") {
            var confirmSkip = window.confirm("Are you sure you'd like top quit?")
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight!");
                playerMoney = playerMoney - 2;
                console.log("playerMoney", playerMoney);
                break;
            } else {
                fight();
            }
        }
        if (promptFight === "fight" || promptFight === "FIGHT") {
            enemyHealth = enemyHealth - playerAttack;
            console.log(
                playerName + " attacked " + enemyName + "! " + enemyName + " now has " + enemyHealth + " health remaining!"
            );
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                break;
            } else {
                window.alert(enemyName + " still has " + enemyHealth + " health!");
            }
            playerHealth = playerHealth - enemyAttack;
            console.log(
                enemyName + " attacked " + playerName + "! " + playerName + " now has " + playerHealth + " health remaining!"
            );
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                break;
            } else {
                window.alert(playerName + " still has " + playerHealth + " health!");
            }
        }
    }
};

var startGame = function () {
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            alert("Welcome to Robot Gladiators! Round " + (i + 1))
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50
            fight(pickedEnemyName);
            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
    if (playerHealth > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + "!");
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

var shop = function () {
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    switch (shopOptionPrompt) {
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling " + playerName + "'s health +20 for 7 dollars.");
                playerHealth = playerHealth + 20;
                playerMoney = playerMoney - 7;
            } else {
                window.alert("You dont have enough money!");
            }
            break;
        case "upgrade":
            if (playerMoney >= 7) {
            window.alert("Upgrading player's attack +7 for 7 dollars.");
            playerAttack = playerAttack + 7;
            playerMoney = playerMoney - 7;
            } else {
                window.alert("You dont have enough money!");
            }
            break;
        case "leave":
            window.alert("Now leaving the store.");
            break;
        default:
            window.alert("That didn't work! Try a valid option!");
            shop();
            break;
    }
};

startGame();