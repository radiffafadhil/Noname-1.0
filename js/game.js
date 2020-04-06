// ngimport kata2 yang mau dirandom dari namaHewan.js
import { randomWord } from './namaHewan.js';

// ngatur variable bosquuh
var answer = document.getElementById('answer');
var word = document.getElementById('word');
var tombolReset = document.getElementById('reset');
var answered = [];
let count = 0;
let pickedWord = randomWord();
let guessedWord;

tombolReset.onclick = function() {
	reset();
};

reset();

function reset() {
	count = 0;
	answered = [];
	pickedWord = randomWord();
	word.innerHTML = '';
	for (let x in pickedWord) {
		answered.push('_');
	}
	answer.innerHTML = answered.join(' ');
	// do while loop, untuk ngecek apakah kata yang dishuffle masih sama dengan kata asli nya
	// jika masih sama maka kata tersebut akan di shuffle lagi
	do {
		guessedWord = shuffle(pickedWord.split('')).join('');
	} while (pickedWord == guessedWord);

	//ngeloop untuk nampilkan huruf yang diacak tadi
	for (let i in guessedWord) {
		// tiap huruf ada <span> nya, inspect aja kalo gak caya
		// terus kutambah class huruf biar bisa di queryselector
		word.innerHTML += `<span class='huruf'>${guessedWord[i]}</span>`;
	}

	// siap ditampilkan huruf yang mau ditebak,
	// aku buat variabl hurufs, yaitu semua yang ada class .huruf
	var hurufs = document.querySelectorAll('.huruf');

	// kan hurufs itu jamak, artinya banyak, jadi ku loop lah
	// pake for loop aja, soalnya cuman mau makek i nya buat index
	for (let i = 0; i < hurufs.length; i++) {
		// tiap huruf di hurufs kalo diklik maka pindah dia ke kolom answer/jawaban
		hurufs[i].onclick = function() {
			isiJawaban(this.textContent); //nambahkan huruf ke answer
			this.style.display = 'none'; //ngehapus display huruf
		};
	}
}

// fungsi untuk ngisi kolom answer/jawaban
function isiJawaban(huruf) {
	answered[count] = huruf;
	count++;
	answer.innerHTML = answered.join(' ');
}

function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// Used like so