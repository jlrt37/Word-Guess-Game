var wins = 0;
var placeholderArray = [];
var prevPlaceholderArray = [];
var wordPlaceholder = [];
var lettersGuessed = [];
var word = [];
var wordPlaceholderString = "";
var userInput = "";
var correctGuessCount = 0;
var guessesLeft = 13;

var StarWarsWords = {
	word1: ["J", "A", "B", "B", "A", "T", "H", "E", "H", "U", "T", "T"],
	word2: ["D", "A", "R", "T", "H", "V", "A", "D", "E", "R"],
	word3: ["O", "B", "I", "W", "A", "N", "K", "E", "N", "O", "B", "I"],
	word4: ["L", "U", "K", "E", "S", "K", "Y", "W", "A", "L", "K", "E", "R"],
	word5: ["B", "O", "B", "A", "F", "E", "T", "T"],
	word6: ["B", "O", "S", "S", "K"],
	word7: ["D", "A", "N", "T", "O", "O", "I", "N", "E"],
	word8: ["D", "E", "A", "T", "H", "S", "T", "A", "R"],
};


var wordArray = [StarWarsWords.word1, StarWarsWords.word2, 
	StarWarsWords.word3, StarWarsWords.word4, 
	StarWarsWords.word5, StarWarsWords.word6, 
	StarWarsWords.word7, StarWarsWords.word8];

createWord(wordArray);

document.onkeyup = function(event) {
	console.log('This is the key entered', event.key);
	var keyPress;

	if (typeof event != 'undefined') {
		keyPress = event.keyCode;

		userInput = String.fromCharCode(keyPress).toUpperCase();
		console.log(userInput + " should match the key entered");

		trackLetterGuesses(userInput);

		buildWord(userInput);
	}

	else if (e) {
		keyPress = e.which;
	}
	return false;
};

function createWord(wordArray) {
	word = wordArray[Math.floor(Math.random()*wordArray.length)];
	console.log(word);

	createWordPlaceholder(word);
	return word;
};

function createWordPlaceholder(word) {	
	var wordPlaceholder = [];

	for (i = 0; i < word.length; i++) {
		wordPlaceholder.push("_");
	}

	wordPlaceholderString = wordPlaceholder.join(" ");

	document.getElementById('word-placeholder').textContent = wordPlaceholderString;
	return wordPlaceholder;
};

function trackLetterGuesses(userInput) {

	for (i = 0; i < lettersGuessed.length; i++) {
		if (userInput == lettersGuessed[i]) {
			return;
		}
	}

	lettersGuessed.push(userInput);
	console.log("LettersGuessed array item: " + lettersGuessed[0]);
	
	var lettersGuessedString = lettersGuessed.join(", ");
	document.getElementById('letters-guessed').innerHTML = lettersGuessedString;

	guessesLeft--;

	document.getElementById('guess-count').innerHTML = guessesLeft;
	console.log('Guesses left' + guessesLeft);

	if (guessesLeft == 0) {
		restartGame();
	}

	return lettersGuessedString;
};

function buildWord(userInput) {

	if (prevPlaceholderArray.length == 0) {
		placeholderArray = createWordPlaceholder(word);

	} else {
		placeholderArray = prevPlaceholderArray;
	}

	for (var i = 0; i < word.length; i++) {
	  console.log('Word is ' + word);
	  if (userInput == word[i]) {
	  	console.log(userInput + " is in word at " + i);
	  	//
	  	placeholderArray[i] = userInput;
	  }
	}

	prevPlaceholderArray = placeholderArray;

	placeholder = placeholderArray.join(" ");
	document.getElementById('word-placeholder').innerHTML = placeholder;

	console.log("Placeholder Array length is " + placeholderArray.length);
	console.log("Placeholder split is " + placeholder.split(","));
	console.log("Word join is " + word.join(" "));
	
	if (placeholder.split(',') == word.join(" ")) {
		console.log("Woot");
		wins++;

		document.getElementById('win-count').innerHTML = wins;
		restartGame();
	}
};

function restartGame(wordPlaceholder) {
	
	createWord(wordArray);

    userInput = "";
	prevPlaceholderArray = [];
	placeholderArray = [];

	guessesLeft = 13;

	correctGuessCount = 0;
	document.getElementById('guess-count').innerHTML = guessesLeft;

	lettersGuessed = [];
	document.getElementById('letters-guessed').innerHTML = lettersGuessed;
};

