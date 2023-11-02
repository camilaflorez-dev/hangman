console.log("js loaded....");

const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector("#guesses");
const keyboardDiv = document.querySelector(".keyboard");


let currentWord;
let wrongGuessCount = 0;
let correctGuessCount = 0;
const maxGuesses = 5;



const wordList = [

    {
        word: "pizza",
        hint: "Luis's favorite food"
    },

    {
        word: "tequila",
        hint: "if life gives you lemons ask for salt and ..."
    },

    {
        word: "banana",
        hint: "A fruit that's yellow and quite a-peeling"
    },

    {
        word: "Ananas",
        hint: "For Italians, an absolute no-no when it comes to pizza"
    },
    
    {
        word: "bug",
        hint: "You don't want it in your bed, and you don't want it in your code"
    },

    {
        word: "Llama",
        hint: "Drama queen of the Andes"
    },

    {
        word: "socks",
        hint: "These have a tendency to magically disappear in the laundry"
    },

    {
        word: "coffee",
        hint: "The reason for adulting before 9 a.m"
    },


    
];



const getRandomWord = () => {

    const randomIndex = Math.floor(Math.random() * wordList.length);
    const randomWordObject = wordList[randomIndex];
    const randomWord = randomWordObject.word;
    const hint = randomWordObject.hint;

    currentWord = randomWord;

    const hintElement = document.querySelector("#hint");
    hintElement.innerText = hint;

    displayWordPlaceholders(randomWord);
    

};


const displayWordPlaceholders = (word) => {
    const characters = word.split("");
    const wordDisplay = document.querySelector(".word-display");
    wordDisplay.innerHTML = "";

    characters.forEach((character) => {
        const li = document.createElement("li");
        li.classList.add("letter");
        wordDisplay.appendChild(li);

    });

};


getRandomWord();





const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        handleCorrectGuess(clickedLetter);
    } else {
        handleWrongGuess();
    }
    
    if (wrongGuessCount > maxGuesses){
        location.href = "./game-over.html"
        
    } 
   // if () {
     //   location.href = "./game-win.html"

//}



    button.disabled = true;
    updateGuessesText();

};

const checkIfWon = (word) => {
    let result = false;
    if (correctGuessCount == word.length) result = true;
    return result
}

const handleCorrectGuess = (letter) => {
    for (let i = 0; i < currentWord.length; i++) {
        if (currentWord[i] === letter) {
            const letterElement = wordDisplay.querySelectorAll("li")[i];
            letterElement.innerText = letter;
            letterElement.classList.add("guessed");
            correctGuessCount++;
        }
    }
    
    console.log(checkIfWon(currentWord))

    if (checkIfWon(currentWord)) {
                location.href = "./game-win.html"

    }
};

const handleWrongGuess = () => {
    wrongGuessCount++;
    hangmanImage.src = `./images/hangman-${wrongGuessCount}.jpeg`;
};

const updateGuessesText = () => {
    guessesText.innerText = `${wrongGuessCount} of ${maxGuesses}`;

};

for (let i = 97; i < 123; i++) {
    const button = document.createElement("button");
    const letter = String.fromCharCode(i);
    button.innerText = letter;

    keyboardDiv.appendChild(button);
    button.addEventListener("click", function (Event) {
      const clickedLetter = Event.target.innerText;
        initGame(button, clickedLetter);

    });
}

