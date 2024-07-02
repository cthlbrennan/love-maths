document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName('button')
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type")
                    runGame(gameType);
            }
        })
    }

    document.getElementById("answer-box").addEventListener('keydown', function(event) {
        if (event.key = 'Enter') {
            checkAnswer()
        } 
    })
    runGame("addition");
})

/**
 * main game loop
 * 
 * 
 */
function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();
    let num1 = Math.floor(Math.random() * 25) + 1;
    let num2 = Math.floor(Math.random() * 25) + 1;

    if (gameType === "addition") {
        displayAdditionQuestion(num1, num2);
    } else if (gameType === "multiply") {
        displayMultiplyQuestion(num1, num2);
    } else if (gameType === "division") {
        displayDivisionQuestion(num1, num2);
    } else if (gameType === "subtract") {
        displaySubtractQuestion(num1, num2);
    }
     else {
        alert(`Unknown game type: ${gameType}`)
        throw `Unknown game type: ${gameType}. Aborting!`
    }
}

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateCorrectAnswer();
    let isCorrect = userAnswer === calculatedAnswer[0];
    if (isCorrect) {
        alert("Correct")
    } else {
        alert(`wrong. answer is ${calculatedAnswer[0]}, not ${userAnswer}`)
    }

    runGame(calculatedAnswer[1])
    if (isCorrect) {
    incrementScore() 
        } else {
            incrementWrongAnswer()
        }
}

function calculateCorrectAnswer() {
    let operand1 = parseInt(document.getElementById("operand1").innerText)
    let operand2 = parseInt(document.getElementById("operand2").innerText)
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") {
        return [operand1 + operand2, "addition"]
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"]
    } else if (operator === "/") {
        return [operand1 / operand2, "division"]
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"]
    }
    else {
        alert(`unimplemented error ${operator}`);
        throw `unimplemented error ${operator}. Aborting!`
    }

}

function incrementScore() {
    let scoreCounter = parseInt(document.getElementById('score').innerText);
    let newScore = scoreCounter + 1;
    document.getElementById('score').innerText = newScore;
   
}

function incrementWrongAnswer() {
    let scoreCounter = parseInt(document.getElementById('incorrect').innerText);
    let newScore = scoreCounter + 1;
    document.getElementById('incorrect').innerText = newScore;
}

function displayAdditionQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "-";
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";
}

function displayDivisionQuestion(operand1, operand2) {
    if (operand1 > operand2) {
        operand1 = operand1 * 10
    } else if (operand2 > operand1) {
        let newOperand1 = operand2
        let newOperand2 = operand1
        operand1 = newOperand1
        operand2 = newOperand2
    }
    document.getElementById("operand1").textContent = operand1 * 10;
    document.getElementById("operand2").textContent = operand2 * 10;
    document.getElementById("operator").textContent = "/";
}